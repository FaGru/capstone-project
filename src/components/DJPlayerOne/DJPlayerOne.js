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
  const djPlayerOne = useStore(state => state.djPlayerOne);
  const setTrackOne = useStore(state => state.setDjTrackOne);
  const [oneIsPlaying, setOneIsPlaying] = useState(0);
  const [trackNameOne, setTrackNameOne] = useState('');
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
          {trackNameOne.length >= 60
            ? trackNameOne.slice(0, 60) + '...'
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
          onChange={e => (djPlayerOne.playbackRate = e.target.value / 100)}
          type="range"
          list="tickmarks"
          min="80"
          max="120"
          step="0.1"
          defaultValue="100"
          id="pitch fader one"
          name="pitch fader one"
          data-testid="pitch fader one"
        />
        <datalist id="tickmarks">
          <option value="80"></option>
          <option value="85"></option>
          <option value="90"></option>
          <option value="95"></option>
          <option value="100"></option>
          <option value="105"></option>
          <option value="110"></option>
          <option value="115"></option>
          <option value="120"></option>
        </datalist>
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
      <PlayButton aria-label="play-button" onClick={handlePlayOne}>
        <StyledButtonImg
          src={djPlayerOne?.state === 'started' ? pauseIcon : playIcon}
          alt="play/pause"
          height="50px"
          width="50px"
        />
      </PlayButton>
    </PlayerContainer>
  );

  function handlePlayOne() {
    if (djPlayerOne.state === 'stopped') {
      djPlayerOne.start();
      setOneIsPlaying(1);
    } else {
      djPlayerOne.stop();
      setOneIsPlaying(0);
    }
  }

  function handleTrackOne(e) {
    djPlayerOne && djPlayerOne.stop();
    oneIsPlaying === 1 && setOneIsPlaying(0);
    const files = e.target.files;
    setTrackOne(URL.createObjectURL(files[0]));
    setTrackNameOne(files[0].name);
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
  margin: 10px;
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
