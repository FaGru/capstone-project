import useStore from '../../hooks/useStore';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import vinylIcon from '../../images/vinyl.svg';
import { useState } from 'react';
import { InvisibleButton, StyledButtonImg } from '../Buttons';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import cueIcon from '../../images/cue.svg';

export default function DJPlayer({
  visiblePlayer,
  setVisiblePlayer,
  isDesktop,
}) {
  const {
    djPlayerTwo,
    djPlayerTwoPlaybackRate,
    isMIDIAssignButtonActive,
    isEchoOutTwoActive,
    setNewMIDIControlFunction,
    setDjTrackTwo,
    initWaveSurferTwo
  } = useStore(state => state);

  const [twoIsPlaying, setTwoIsPlaying] = useState(0);
  const [trackNameTwo, setTrackNameTwo] = useState(
    '- click to select a track -'
  );

  return (
    <PlayerContainer
      initial={{ x: '-500px' }}
      animate={
        visiblePlayer === 1 && isDesktop === false ? { x: -700 } : { x: 0 }
      }
      transition={{
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
      }}
    >
      <TrackUploadContainer>
        <TrackUploadLabel htmlFor="file upload two">
          <p>
            {trackNameTwo.length >= 50
              ? trackNameTwo.slice(0, 50) + '...'
              : trackNameTwo}
          </p>
          <input
            onChange={handleTrackTwo}
            type="file"
            accept="audio/*"
            id="file upload two"
            name="file upload two"
            data-testid="file upload two"
          />
        </TrackUploadLabel>
        <WaveformContainer id="waveformTwo"></WaveformContainer>
      </TrackUploadContainer>
      <Vinyl
        rotate={twoIsPlaying}
        src={vinylIcon}
        alt="vinyl"
        height="130px"
        width="130px"
      />
      <PitchFaderLabel htmlFor="pitch fader two">
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
          step="0.01"
          value={djPlayerTwoPlaybackRate}
          id="pitch fader two"
          name="pitch fader two"
          data-testid="pitch fader two"
        />
      </PitchFaderLabel>
      <PlayerSwitchButton onClick={() => setVisiblePlayer(1)}>
        Show Player 1
      </PlayerSwitchButton>
      <CueButton
        draggable={false}
        aria-label="cue-button"
        isMIDIAssignActive={isMIDIAssignButtonActive}
        onMouseDown={() =>
          isMIDIAssignButtonActive
            ? setNewMIDIControlFunction(handlePlayTwo, 'tap')
            : handlePlayTwo()
        }
        onMouseUp={handlePlayTwo}
      >
        <StyledButtonImg src={cueIcon} alt="cue" height="50px" width="50px" />
      </CueButton>
      <PlayButton
        draggable={false}
        aria-label="play-button"
        isMIDIAssignActive={isMIDIAssignButtonActive}
        onMouseDown={() =>
          isMIDIAssignButtonActive
            ? setNewMIDIControlFunction(handlePlayTwo, 'normal')
            : handlePlayTwo()
        }
      >
        <StyledButtonImg
          src={djPlayerTwo?.state === 'started' ? pauseIcon : playIcon}
          alt="play/pause"
          height="50px"
          width="50px"
        />
      </PlayButton>
      <FXButton
        isActive={isEchoOutTwoActive}
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
  function handlePlayTwo() {
    const { djPlayerTwo, wavesurferTwo } = useStore.getState();
    if (djPlayerTwo.state === 'stopped') {
      djPlayerTwo.start();
      wavesurferTwo.play();
      setTwoIsPlaying(1);
    } else {
      djPlayerTwo.stop();
      wavesurferTwo.stop();
      setTwoIsPlaying(0);
    }
  }
  function handleTrackTwo(e) {
    djPlayerTwo.stop();
    twoIsPlaying === 1 && setTwoIsPlaying(0);
    const files = e.target.files;
    setDjTrackTwo(URL.createObjectURL(files[0]));
    setTrackNameTwo(files[0].name);
    initWaveSurferTwo()
  }
  function handlePitch(value) {
    const { djPlayerTwo, setDjPlayerTwoPlaybackRate } = useStore.getState();
    setDjPlayerTwoPlaybackRate(value);
    djPlayerTwo.playbackRate = value / 317.5 + 0.8;
  }
  function handleEchoOut() {
    const setIsEchoOutTwoActive = useStore.getState().setIsEchoOutTwoActive;
    const {
      djPlayerTwo,
      highpassFilterPlayerTwo,
      feedbackDelay,
      isEchoOutTwoActive,
    } = useStore.getState();
    setIsEchoOutTwoActive();
    if (isEchoOutTwoActive === false) {
      highpassFilterPlayerTwo.connect(feedbackDelay);
      setTimeout(function () {
        djPlayerTwo.mute = true;
      }, 500);
    }
    if (isEchoOutTwoActive === true) {
      highpassFilterPlayerTwo.disconnect(feedbackDelay);
      highpassFilterPlayerTwo.toDestination();
      djPlayerTwo.mute = false;
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
  @media (max-width: 1000px) {
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
  @media (min-width: 1001px) {
    display: none;
  }
`;
const TrackUploadContainer = styled.div`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TrackUploadLabel = styled.label`
  margin: 10px;
  cursor: pointer;

  input {
    display: none;
  }
  p {
    margin: 0;
    font-size: 0.8rem;
    text-align: center;
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
  margin: 5px;
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
  margin: 5px;
  ${props =>
    props.isMIDIAssignActive &&
    'background-color: var(--purple); box-shadow: inset 0 0 20px 2px var(--purple)'};
`;
const WaveformContainer = styled.div`
  align-content: center;
  justify-self: center;
  padding-top: 8px;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  background-color: var(--blue);
  border: 1px solid var(--gray);
  box-shadow: inset 0 0 10px 5px var(--black), 0 0 5px 0px var(--lightgray);
`;
