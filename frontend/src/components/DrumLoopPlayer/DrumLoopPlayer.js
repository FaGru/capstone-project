import styled from 'styled-components';
import { useState } from 'react';
import { InvisibleButton } from '../Buttons';

import playbutton from '../../images/play.svg';
import pausebutton from '../../images/pause.svg';

export default function DrumLoopPlayer({ startDrumLoop, getDrumLoop }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <DrumLoopContainer>
      <PlayPauseButton
        type="button"
        onClick={handleClick}
        aria-label="pause play"
      >
        <PlayPauseImg
          src={isPlaying ? pausebutton : playbutton}
          height="42px"
          width="42px"
          alt="play pause"
        />
      </PlayPauseButton>
      <DrumLoopLabel htmlFor="drum-loop-select">
        Choose a Drum Loop
      </DrumLoopLabel>
      <DrumLoopSelect
        name="drum-loops"
        id="drum-loop-select"
        onChange={handleChange}
      >
        <option>DrumLoop90BPM</option>
        <option>Strings90BPM</option>
        <option>GS-Mixdown94BPM</option>
        <option>GS-Mixdown98BPM</option>
        <option>DirtyBass120BPM</option>
      </DrumLoopSelect>
    </DrumLoopContainer>
  );

  function handleClick() {
    startDrumLoop(isPlaying);
    setIsPlaying(!isPlaying);
  }
  function handleChange(event) {
    const currentLoop = event.target.value;
    getDrumLoop(currentLoop);
    isPlaying ? setIsPlaying(false) : setIsPlaying(false);
  }
}

const DrumLoopContainer = styled.div`
  background-color: var(--gray);
  display: grid;
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  width: 230px;
  height: 60px;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr 2fr;
  margin: 10px;
  padding: 3px;
  border: 1px solid var(--lightgray);
  border-radius: 40px;
  box-shadow: inset 0 0 5px 2px var(--darkgray);
`;

const PlayPauseButton = styled(InvisibleButton)`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;
const PlayPauseImg = styled.img`
  transition: ease 0.4s;
  border: 1px solid var(--darkgray);
  border-bottom: 4px solid var(--darkgray);
  border-right: 4px solid var(--darkgray);
  border-radius: 100%;
  padding: 3px;

  &:active {
    transition: ease 0.2s;
    border-top: 4px solid var(--darkgray);
    border-left: 4px solid var(--darkgray);
  }
`;

const DrumLoopLabel = styled.label`
  font-size: 0.8rem;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const DrumLoopSelect = styled.select`
  text-align: center;
  height: 25px;
  max-width: 150px;
  color: var(--white);
  background-color: var(--lightgray);
  border: 1px solid var(--white);
  border-radius: 5px;
  align-self: start;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  box-shadow: inset 0 0 5px 2px var(--darkgray);
  cursor: grab;
`;
