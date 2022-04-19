import useStore from '../hooks/useStore';
import styled from 'styled-components';
import uploadIcon from '../images/upload.svg';
import vinylIcon from '../images/vinyl.svg';
import { useState } from 'react';

export default function DJPlayer() {
  const djPlayerOne = useStore(state => state.djPlayerOne);
  const djPlayerTwo = useStore(state => state.djPlayerTwo);
  const setTrackOne = useStore(state => state.setDjTrackOne);
  const setTrackTwo = useStore(state => state.setDjTrackTwo);
  const initDJPlayerOne = useStore(state => state.initDJPlayerOne);
  const initDJPlayerTwo = useStore(state => state.initDJPlayerTwo);
  const [oneIsPlaying, setOneIsPlaying] = useState(0);
  const [twoIsPlaying, setTwoIsPlaying] = useState(0);
  console.log(djPlayerOne);

  return (
    <ComponentContainer>
      <PlayerContainer>
        <label htmlFor="file upload one" />
        <TrackInput
          onChange={handleTrackOne}
          type="file"
          id="file upload one"
        />
        <button onClick={handlePlayOne}>Play</button>
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
        <button onClick={handlePlayTwo}>Play</button>
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
    djPlayerOne.state === 'stopped' ? djPlayerOne.start() : djPlayerOne.stop();
    oneIsPlaying === 0 ? setOneIsPlaying(1) : setOneIsPlaying(0);
  }
  function handlePlayTwo() {
    djPlayerTwo.state === 'stopped' ? djPlayerTwo.start() : djPlayerTwo.stop();
    twoIsPlaying === 0 ? setTwoIsPlaying(1) : setTwoIsPlaying(0);
  }
  function handleTrackOne(e) {
    djPlayerOne.stop();
    oneIsPlaying === 1 && setOneIsPlaying(0);
    const files = e.target.files;
    setTrackOne(URL.createObjectURL(files[0]));
    initDJPlayerOne();
  }
  function handleTrackTwo(e) {
    djPlayerTwo.stop();
    twoIsPlaying === 1 && setTwoIsPlaying(0);
    const files = e.target.files;
    setTrackTwo(URL.createObjectURL(files[0]));
    initDJPlayerTwo();
  }
}

const ComponentContainer = styled.div`
  display: flex;
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  border: 2px solid var(--white);
`;

const TrackInput = styled.input`
  margin: 10px;
  padding: 10px;
  ::-webkit-file-upload-button {
    display: none;
  }
  ::before {
    content: url(${uploadIcon});
    cursor: pointer;
    padding: 10px;
  }
`;
const Vinyl = styled.img`
  @keyframes dance {
    100% {
      transform: rotate(1440deg);
    }
  }
  ${props => (props.rotate === 1 ? `animation: dance 20s infinite` : '')};
`;
