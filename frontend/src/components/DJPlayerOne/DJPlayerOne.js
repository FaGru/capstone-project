import useStore from '../../hooks/useStore';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { InvisibleButton, StyledButtonImg } from '../Buttons';
import vinylIcon from '../../images/vinyl.svg';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import cueIcon from '../../images/cue.svg';

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
    oneIsPlaying,
    setNewMIDIControlFunction,
    setDjTrackOne,
    initWaveSurferOne,
    handleEchoOutOne,
    handlePlayOne,
    handlePitchOne,
  } = useStore(state => state);

  const [trackNameOne, setTrackNameOne] = useState(
    '- click to select a track -'
  );

  return (
    <PlayerContainer
      initial={{ x: '-500px' }}
      animate={
        visiblePlayer === 2 && isDesktop === false ? { x: '-700px' } : { x: 0 }
      }
      transition={{
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
      }}
    >
      <TrackUploadContainer>
        <TrackUploadLabel htmlFor="file upload one">
          <p>
            {trackNameOne.length >= 50
              ? trackNameOne.slice(0, 50) + '...'
              : trackNameOne}
          </p>
          <input
            onChange={handleTrackOne}
            type="file"
            accept="audio/*"
            id="file upload one"
            name="file upload one"
            data-testid="file upload one"
          />
        </TrackUploadLabel>
        <WaveformContainer id="waveformOne"></WaveformContainer>
      </TrackUploadContainer>
      <Vinyl
        rotate={oneIsPlaying}
        src={vinylIcon}
        alt="vinyl"
        height="130px"
        width="130px"
      />
      <PitchFaderLabel htmlFor="pitch fader one">
        <PitchFaderInput
          isMIDIAssignActive={isMIDIAssignButtonActive}
          onChange={event => handlePitchOne(event.target.value)}
          onClick={() =>
            isMIDIAssignButtonActive &&
            setNewMIDIControlFunction('pitchOne', 'range')
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
            ? setNewMIDIControlFunction('playOne', 'tap')
            : handlePlayOne()
        }
        onMouseUp={() => !isMIDIAssignButtonActive && handlePlayOne()}
      >
        <StyledButtonImg src={cueIcon} alt="cue" height="50px" width="50px" />
      </CueButton>
      <PlayButton
        draggable={false}
        aria-label="play-button"
        isMIDIAssignActive={isMIDIAssignButtonActive}
        onClick={() =>
          isMIDIAssignButtonActive
            ? setNewMIDIControlFunction('playOne', 'normal')
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
            ? setNewMIDIControlFunction('echoOutOne', 'normal')
            : handleEchoOutOne()
        }
      >
        echo out
      </FXButton>
    </PlayerContainer>
  );

  function handleTrackOne(e) {
    djPlayerOne.stop();
    const files = e.target.files;
    setDjTrackOne(URL.createObjectURL(files[0]));
    setTrackNameOne(files[0].name);
    initWaveSurferOne();
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
