import useStore from '../../hooks/useStore';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import vinylIcon from '../../images/vinyl.svg';
import { useState } from 'react';
import { InvisibleButton, StyledButtonImg } from '../Buttons';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import cueIcon from '../../images/cue.svg';
import uploadIcon from '../../images/upload.svg';

export default function DJPlayer({ visiblePlayer, setVisiblePlayer }) {
  const {
    djPlayerTwo,
    djPlayerTwoPlaybackRate,
    highpassFilterPlayerTwo,
    feedbackDelay,
  } = useStore(state => state);
  const setTrackTwo = useStore(state => state.setDjTrackTwo);
  const setDjPlayerTwoPlaybackRate = useStore(
    state => state.setDjPlayerTwoPlaybackRate
  );
  const [twoIsPlaying, setTwoIsPlaying] = useState(0);
  const [trackNameTwo, setTrackNameTwo] = useState('');

  const [isEchoOutActive, setIsEchoOutActive] = useState(false);

  return (
    <PlayerContainer
      initial={{ x: '-500px' }}
      animate={
        visiblePlayer === 1 && window.innerWidth < 600 ? { x: -500 } : { x: 0 }
      }
      transition={{
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
      }}
    >
      <TrackUploadLabel htmlFor="file upload two">
        <img src={uploadIcon} alt="upload" />
        <div>
          {trackNameTwo.length >= 60
            ? trackNameTwo.slice(0, 60) + '...'
            : trackNameTwo}
        </div>
        <input
          onChange={handleTrackTwo}
          type="file"
          accept="audio/*"
          id="file upload two"
          name="file upload two"
          data-testid="file upload two"
        />
      </TrackUploadLabel>
      <Vinyl
        rotate={twoIsPlaying}
        src={vinylIcon}
        alt="vinyl"
        height="150px"
        width="150px"
      />
      <PitchFaderLabel htmlFor="pitch fader two">
        <input
          onChange={handlePitch}
          type="range"
          min="0.8"
          max="1.2"
          step="0.01"
          defaultValue={djPlayerTwoPlaybackRate}
          id="pitch fader two"
          name="pitch fader two"
          data-testid="pitch fader two"
        />
      </PitchFaderLabel>
      <PlayerSwitchButton onClick={() => setVisiblePlayer(1)}>
        Show Player 1
      </PlayerSwitchButton>
      <CueButton
        aria-label="cue-button"
        onMouseDown={handlePlayTwo}
        onMouseUp={handlePlayTwo}
      >
        <StyledButtonImg src={cueIcon} alt="cue" height="50px" width="50px" />
      </CueButton>
      <PlayButton aria-label="play-button" onClick={handlePlayTwo}>
        <StyledButtonImg
          src={djPlayerTwo?.state === 'started' ? pauseIcon : playIcon}
          alt="play/pause"
          height="50px"
          width="50px"
        />
      </PlayButton>
      <button onClick={handleEchoOut}>echo out</button>
    </PlayerContainer>
  );
  function handlePlayTwo() {
    if (djPlayerTwo.state === 'stopped') {
      djPlayerTwo.start();
      setTwoIsPlaying(1);
    } else {
      djPlayerTwo.stop();
      setTwoIsPlaying(0);
    }
  }
  function handleTrackTwo(e) {
    djPlayerTwo.stop();
    twoIsPlaying === 1 && setTwoIsPlaying(0);
    const files = e.target.files;
    setTrackTwo(URL.createObjectURL(files[0]));
    setTrackNameTwo(files[0].name);
  }
  function handlePitch(e) {
    setDjPlayerTwoPlaybackRate(e.target.value);
    djPlayerTwo.playbackRate = e.target.value;
  }
  function handleEchoOut() {
    setIsEchoOutActive(!isEchoOutActive);
    if (isEchoOutActive === false) {
      highpassFilterPlayerTwo.connect(feedbackDelay);
      setTimeout(function () {
        djPlayerTwo.mute = true;
      }, 500);
    }
    if (isEchoOutActive === true) {
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
  grid-template-rows: 1fr auto 1fr;
  width: 320px;
  @media (max-width: 600px) {
    grid-row: 1/ 2;
    grid-column: 1 / 2;
  }
`;
const PlayButton = styled(InvisibleButton)`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  justify-self: end;
`;
const CueButton = styled(InvisibleButton)`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  justify-self: start;
`;
const PlayerSwitchButton = styled.button`
  grid-column: 3 / 4;
  grid-row: 3 / 4;
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
  grid-row: 2 / 3;
  justify-self: center;
  margin: 20px;
  transform: rotate(90deg);
  input {
    color: var(--white);
  }
`;

const Vinyl = styled.img`
  margin: 10px;
  grid-column: 1 / 4;
  grid-row: 2 / 3;
  justify-self: center;
  @keyframes play {
    100% {
      transform: rotate(360deg);
    }
  }
  ${props => props.rotate === 1 && `animation: play linear 2s infinite; `}
`;
