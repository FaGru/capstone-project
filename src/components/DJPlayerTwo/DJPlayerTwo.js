import useStore from '../../hooks/useStore';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import vinylIcon from '../../images/vinyl.svg';
import { useState } from 'react';
import { InvisibleButton, StyledButtonImg } from '../Buttons';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import cueIcon from '../../images/cue.svg';

export default function DJPlayer({ visiblePlayer, setVisiblePlayer }) {
  const djPlayerTwo = useStore(state => state.djPlayerTwo);
  const setTrackTwo = useStore(state => state.setDjTrackTwo);
  const [twoIsPlaying, setTwoIsPlaying] = useState(0);

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
        <input
          onChange={handleTrackTwo}
          type="file"
          id="file upload two"
          name="file upload two"
          data-testid="file upload two"
        />
      </TrackUploadLabel>
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
      <Vinyl
        rotate={twoIsPlaying}
        src={vinylIcon}
        alt="vinyl"
        height="150px"
        width="150px"
      />
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
  }
}
const PlayerContainer = styled(motion.div)`
  display: grid;
  border: 2px solid var(--white);
  border-radius: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr auto 1fr;
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
  ${props => (props.rotate === 1 ? `animation: play linear 2s infinite; ` : '')}
`;
