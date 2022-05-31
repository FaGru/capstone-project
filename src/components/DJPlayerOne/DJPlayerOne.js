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

export default function DJPlayer({ visiblePlayer, setVisiblePlayer }) {
  const {
    djPlayerOne,
    djPlayerOnePlaybackRate,
    isMIDIAssignButtonActive,
    isEchoOutOneActive,
    setNewMIDIControlFunction,
    setDjTrackOne,
    setDjPlayerOnePlaybackRate
  } = useStore(state => state);


  const [oneIsPlaying, setOneIsPlaying] = useState(0);
  const [trackNameOne, setTrackNameOne] = useState('load up a track...');

  return (
    <PlayerContainer
      initial={{ x: '-500px' }}
      animate={
        visiblePlayer === 2 && window.innerWidth < 600
          ? { x: '-500px' }
          : { x: 0 }
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
        <input
          onChange={handlePitch}
          type="range"
          min="0.8"
          max="1.2"
          step="0.01"
          defaultValue={djPlayerOnePlaybackRate}
          id="pitch fader one"
          name="pitch fader one"
          data-testid="pitch fader one"
        />
      </PitchFaderLabel>
      <PlayerSwitchButton onClick={() => setVisiblePlayer(2)}>
        Show Player 2
      </PlayerSwitchButton>
      <CueButton
        aria-label="cue-button"
        onMouseDown={handlePlayOne}
        onMouseUp={handlePlayOne}
      >
        <StyledButtonImg src={cueIcon} alt="cue" height="50px" width="50px" />
      </CueButton>
      <PlayButton
        aria-label="play-button"
        onClick={() =>
          isMIDIAssignButtonActive
            ? setNewMIDIControlFunction(handlePlayOne)
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
        onClick={() =>
          isMIDIAssignButtonActive
            ? setNewMIDIControlFunction(handleEchoOut)
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

  function handlePitch(e) {
    setDjPlayerOnePlaybackRate(e.target.value);
    djPlayerOne.playbackRate = e.target.value;
  }

  function handleEchoOut() {
    const setIsEchoOutOneActive = useStore.getState().setIsEchoOutOneActive;
    const {
      djPlayerOne,
      highpassFilterPlayerOne,
      feedbackDelay,
      isEchoOutOneActive,
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
  @media (max-width: 600px) {
    grid-row: 1/ 2;
    grid-column: 1 / 2;
  }
`;
const PlayButton = styled(InvisibleButton)`
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  justify-self: end;
`;
const CueButton = styled(InvisibleButton)`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  justify-self: start;
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
  input {
    color: var(--white);
    transform: rotate(90deg);
    margin: auto;
    height: 20px;
  }
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
  border: none;
  border-radius: 5px;
  margin: 10px;
`;
