import useStore from '../../hooks/useStore';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { InvisibleButton, StyledButtonImg } from '../Buttons';
import vinylIcon from '../../images/vinyl.svg';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import cueIcon from '../../images/cue.svg';
import uploadIcon from '../../images/upload.svg';
import { BackgroundAnimation } from '../BackgroundAnimation';

export default function DJPlayer({
  visiblePlayer,
  setVisiblePlayer,
  isDesktop,
}) {
  const {
    djPlayerOne,
    djPlayerOnePlaybackRate,
    isMIDIAssignButtonActive,
    isEchoOutOneActive,
    setNewMIDIControlFunction,
    setDjTrackOne,
  } = useStore(state => state);

  const [oneIsPlaying, setOneIsPlaying] = useState(0);
  const [trackNameOne, setTrackNameOne] = useState('load up a track...');

  return (
    <PlayerContainer
      initial={{ x: '-500px' }}
      animate={
        visiblePlayer === 2 && isDesktop === false ? { x: '-500px' } : { x: 0 }
      }
      transition={{
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
      }}
    >
      <TrackUploadLabel htmlFor="file upload one">
        <img src={uploadIcon} alt="upload" />
        <div>
          {trackNameOne.length >= 50
            ? trackNameOne.slice(0, 50) + '...'
            : trackNameOne}
        </div>

        <input
          onChange={handleTrackOne}
          type="file"
          accept="audio/*"
          id="file upload one"
          name="file upload one"
          data-testid="file upload one"
        />
      </TrackUploadLabel>
      <Vinyl
        rotate={oneIsPlaying}
        src={vinylIcon}
        alt="vinyl"
        height="150px"
        width="150px"
      />
      <PitchFaderLabel htmlFor="pitch fader one">
        <PitchFaderInput
          isMIDIAssignActive={isMIDIAssignButtonActive}
          onChange={event => handlePitch(event.target.value)}
          onClick={() =>
            isMIDIAssignButtonActive &&
            setNewMIDIControlFunction(handlePitch, 'range')
          }
          type="range"
          min="0"
          max="127"
          value={djPlayerOnePlaybackRate}
          id="pitch fader one"
          name="pitch fader one"
          data-testid="pitch fader one"
        />
      </PitchFaderLabel>
      <PlayerSwitchButton onClick={() => setVisiblePlayer(2)}>
        Show Player 2
      </PlayerSwitchButton>

      <CueButton
        draggable={false}
        aria-label="cue-button"
        isMIDIAssignActive={isMIDIAssignButtonActive}
        onMouseDown={() =>
          isMIDIAssignButtonActive
            ? setNewMIDIControlFunction(handlePlayOne, 'tap')
            : handlePlayOne()
        }
        onMouseUp={handlePlayOne}
      >
        <StyledButtonImg src={cueIcon} alt="cue" height="50px" width="50px" />
      </CueButton>
      <PlayButton
        draggable={false}
        aria-label="play-button"
        isMIDIAssignActive={isMIDIAssignButtonActive}
        onClick={() =>
          isMIDIAssignButtonActive
            ? setNewMIDIControlFunction(handlePlayOne, 'normal')
            : handlePlayOne()
        }
      >
        <StyledButtonImg
          src={djPlayerOne?.state === 'started' ? pauseIcon : playIcon}
          alt="play/pause"
          height="50px"
          width="50px"
        />
      </PlayButton>
      <FXButton
        isActive={isEchoOutOneActive}
        isMIDIAssignActive={isMIDIAssignButtonActive}
        onClick={() =>
          isMIDIAssignButtonActive
            ? setNewMIDIControlFunction(handleEchoOut, 'normal')
            : handleEchoOut()
        }
      >
        echo out
      </FXButton>
    </PlayerContainer>
  );

  function handlePlayOne() {
    const { djPlayerOne } = useStore.getState();
    if (djPlayerOne.state === 'stopped') {
      djPlayerOne.start();
      setOneIsPlaying(1);
    } else {
      djPlayerOne.stop();
      setOneIsPlaying(0);
    }
  }

  function handleTrackOne(e) {
    djPlayerOne.stop();
    oneIsPlaying === 1 && setOneIsPlaying(0);
    const files = e.target.files;
    setDjTrackOne(URL.createObjectURL(files[0]));
    setTrackNameOne(files[0].name);
  }

  function handlePitch(value) {
    const { djPlayerOne, setDjPlayerOnePlaybackRate } = useStore.getState();
    setDjPlayerOnePlaybackRate(value);
    djPlayerOne.playbackRate = value / 317.5 + 0.8;
  }

  function handleEchoOut() {
    const {
      djPlayerOne,
      highpassFilterPlayerOne,
      feedbackDelay,
      isEchoOutOneActive,
      setIsEchoOutOneActive,
    } = useStore.getState();
    setIsEchoOutOneActive();
    if (isEchoOutOneActive === false) {
      highpassFilterPlayerOne.connect(feedbackDelay);
      setTimeout(function () {
        djPlayerOne.mute = true;
      }, 500);
    }
    if (isEchoOutOneActive === true) {
      highpassFilterPlayerOne.disconnect(feedbackDelay);
      highpassFilterPlayerOne.toDestination();
      djPlayerOne.mute = false;
    }
  }
}

const PlayerContainer = styled(motion.div)`
  display: grid;
  border: 2px solid var(--white);
  border-radius: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  width: 320px;
  box-shadow: inset 0 0 15px 5px var(--black);
  border: 1px solid var(--darkgray);
  background-color: var(--darkgray);
  @media (max-width: 600px) {
    grid-row: 1/ 2;
    grid-column: 1 / 2;
  }
`;
const PlayButton = styled(InvisibleButton)`
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  justify-self: end;
  ${props => props.isMIDIAssignActive && 'background-color: var(--purple)'};
  border-radius: 10px;
`;
const CueButton = styled(InvisibleButton)`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  justify-self: start;
  ${props => props.isMIDIAssignActive && 'background-color: var(--purple)'};
  border-radius: 10px;
`;
const PlayerSwitchButton = styled.button`
  grid-column: 3 / 4;
  grid-row: 4 / 5;
  border-radius: 10px;
  width: 60px;
  height: 60px;
  align-self: center;
  justify-self: end;
  margin: 5px;
  @media (min-width: 601px) {
    display: none;
  }
`;
const TrackUploadLabel = styled.label`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: center;
  max-width: 300px;
  display: flex;
  gap: 10px;
  margin: 5px;

  input {
    display: none;
  }
`;
const PitchFaderLabel = styled.label`
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  justify-self: center;
  width: 120px;

  display: flex;
`;
const PitchFaderInput = styled.input`
  box-shadow: inset 20px 20px var(--white);
  transform: rotate(90deg);
  margin: auto;
  height: 20px;
  ${props =>
    props.isMIDIAssignActive && 'box-shadow: inset 20px 20px var(--purple)'};
  border-radius: 10px;
`;

const Vinyl = styled.img`
  margin: 10px;
  grid-column: 1 / 4;
  grid-row: 3 / 4;
  justify-self: center;
  @keyframes play {
    100% {
      transform: rotate(360deg);
    }
  }
  ${props => props.rotate === 1 && `animation: play linear 2s infinite; `}
`;
const FXButton = styled.button`
  grid-column: 1 / 2;
  background-color: ${props =>
    props.isActive === true ? 'var(--blue-active)' : 'var(--blue)'};
  box-shadow: ${props =>
    props.isActive === true
      ? '0 0 20px 2px var(--blue)'
      : 'inset 0 0 20px 2px var(--blue-active)'};
  border-radius: 5px;
  margin: 10px;
  ${props =>
    props.isMIDIAssignActive &&
    'background-color: var(--purple); box-shadow: inset 0 0 20px 2px var(--purple)'};
`;
