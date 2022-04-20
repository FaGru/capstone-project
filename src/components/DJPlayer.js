import useStore from '../hooks/useStore';
import styled from 'styled-components';
import uploadIcon from '../images/upload.svg';
import vinylIcon from '../images/vinyl.svg';
import { useState } from 'react';
import { InvisibleButton, StyledButtonImg } from './Buttons';
import playIcon from '../images/play.svg';
import pauseIcon from '../images/pause.svg';

export default function DJPlayer() {
  const { djPlayerOne, djPlayerTwo } = useStore(state => state);

  const setTrackOne = useStore(state => state.setDjTrackOne);
  const setTrackTwo = useStore(state => state.setDjTrackTwo);
  const [oneIsPlaying, setOneIsPlaying] = useState(0);
  const [twoIsPlaying, setTwoIsPlaying] = useState(0);

  return (
    <ComponentContainer>
      <PlayerContainer>
        <label htmlFor="file upload one" />
        <TrackInput
          onChange={handleTrackOne}
          type="file"
          id="file upload one"
        />
        <PlayButton onMouseDown={handlePlayOne}>
          <StyledButtonImg
            src={oneIsPlaying === 0 ? playIcon : pauseIcon}
            alt="play/pause"
            height="40px"
            width="40px"
          />
        </PlayButton>
        <Vinyl
          rotate={oneIsPlaying}
          src={vinylIcon}
          alt="vinyl"
          height="50px"
          width="50px"
        />
      </PlayerContainer>
      <PlayerContainer>
        <label htmlFor="file upload two" />
        <TrackInput
          onChange={handleTrackTwo}
          type="file"
          id="file upload two"
        />
        <PlayButton onMouseDown={handlePlayTwo}>
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
          height="50px"
          width="50px"
        />
      </PlayerContainer>
    </ComponentContainer>
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
  function handlePlayTwo() {
    if (djPlayerTwo.state === 'stopped') {
      djPlayerTwo.start();
      setTwoIsPlaying(1);
    } else {
      djPlayerTwo.stop();
      setTwoIsPlaying(0);
    }
  }
  function handleTrackOne(e) {
    djPlayerOne.stop();
    oneIsPlaying === 1 && setOneIsPlaying(0);
    const files = e.target.files;
    setTrackOne(URL.createObjectURL(files[0]));
  }
  function handleTrackTwo(e) {
    djPlayerTwo.stop();
    twoIsPlaying === 1 && setTwoIsPlaying(0);
    const files = e.target.files;
    setTrackTwo(URL.createObjectURL(files[0]));
  }
}

const ComponentContainer = styled.div`
  display: flex;
  place-content: center;
  gap: 5px;
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

const PlayerContainer = styled.div`
  display: grid;
  border: 2px solid var(--white);
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;
const PlayButton = styled(InvisibleButton)`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`;

const TrackInput = styled.input`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: center;
`;
const Vinyl = styled.img`
  padding: 1px;
  border-radius: 100%;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  @keyframes dance {
    100% {
      transform: rotate(360deg);
    }
  }
  ${props => (props.rotate === 1 ? `animation: dance linear 2s infinite` : '')};
`;
