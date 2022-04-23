import useStore from '../../hooks/useStore';
import styled from 'styled-components';
import vinylIcon from '../../images/vinyl.svg';
import { useState } from 'react';
import { InvisibleButton, StyledButtonImg } from '../Buttons';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import cueIcon from '../../images/cue.svg';

export default function DJPlayer() {
  const djPlayerOne = useStore(state => state.djPlayerOne);
  const setTrackOne = useStore(state => state.setDjTrackOne);
  const [oneIsPlaying, setOneIsPlaying] = useState(0);

  return (
    <PlayerContainer>
      <TrackUploadLabel htmlFor="file upload one">
        <input
          onChange={handleTrackOne}
          type="file"
          id="file upload one"
          name="file upload one"
          data-testid="file upload one"
        />
      </TrackUploadLabel>
      <CueButton
        aria-label="play-button"
        onMouseDown={handlePlayOne}
        onMouseUp={handlePlayOne}
      >
        <StyledButtonImg src={cueIcon} alt="cue" height="50px" width="50px" />
      </CueButton>
      <PlayButton aria-label="play-button" onClick={handlePlayOne}>
        <StyledButtonImg
          src={oneIsPlaying === 0 ? playIcon : pauseIcon}
          alt="play/pause"
          height="50px"
          width="50px"
        />
      </PlayButton>
      <Vinyl
        rotate={oneIsPlaying}
        src={vinylIcon}
        alt="vinyl"
        height="150px"
        width="150px"
      />
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
    djPlayerOne.stop();
    oneIsPlaying === 1 && setOneIsPlaying(0);
    const files = e.target.files;
    setTrackOne(URL.createObjectURL(files[0]));
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
const CueButton = styled(InvisibleButton)`
  grid-column: 2 / 3;
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
