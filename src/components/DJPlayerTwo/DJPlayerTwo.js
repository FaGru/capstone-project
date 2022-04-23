import useStore from '../../hooks/useStore';
import styled from 'styled-components';
import vinylIcon from '../../images/vinyl.svg';
import { useState } from 'react';
import { InvisibleButton, StyledButtonImg } from '../Buttons';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import uplodIcon from '../../images/upload.svg';

export default function DJPlayer() {

  const djPlayerTwo = useStore(state => state.djPlayerTwo);
  const setTrackTwo = useStore(state => state.setDjTrackTwo);
  const [twoIsPlaying, setTwoIsPlaying] = useState(0);

  return (

      <PlayerContainer>
        <TrackUploadLabel htmlFor="file upload two">
          <img src={uplodIcon} alt="upload" />
          <input
            onChange={handleTrackTwo}
            type="file"
            id="file upload two"
            name="file upload two"
            data-testid="file upload two"
          />
        </TrackUploadLabel>
        <PlayButton aria-label="play-button" onClick={handlePlayTwo}>
          <StyledButtonImg
            src={djPlayerTwo?.state === 'started' ? pauseIcon : playIcon}
            alt="play/pause"
            height="40px"
            width="40px"
          />
        </PlayButton>
        <Vinyl
          rotate={twoIsPlaying}
          src={vinylIcon}
          alt="vinyl"
          height="100px"
          width="100px"
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
const PlayerContainer = styled.div`
  display: grid;
  border: 2px solid var(--white);
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto 1fr;
`;
const PlayButton = styled(InvisibleButton)`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
`;
const TrackUploadLabel = styled.label`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  align-self: center;
  text-align: center;
`;
const Vinyl = styled.img`
  margin: 10px;
  border-radius: 100%;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  justify-self: center;
  @keyframes dance {
    100% {
      transform: rotate(360deg);
    }
  }
  ${props =>
    props.rotate === 1 ? `animation: dance linear 2s infinite; ` : ''}
`;
