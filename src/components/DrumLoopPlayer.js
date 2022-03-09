import styled from 'styled-components';
import { useState, useRef } from 'react';
import playbutton from '../images/play.svg';
import pausebutton from '../images/pause.svg';
import * as Tone from 'tone';

export default function DrumLoopPlayer() {
  const [currentDrumLoop, setCurrentDrumLoop] = useState();
  const [isPlayin, setIsPlayin] = useState(playbutton);

  const loopPlayer = useRef();
  loopPlayer.current = new Tone.Player(
    `./audio/DrumLoops/${currentDrumLoop}.wav`
  ).toDestination();
  loopPlayer.current.loop = true;

  return (
    <DrumLoopContainer>
      <PlayPauseButton onClick={startDrumLoop} aria-label="play pause">
        <img src={isPlayin} height="50px" width="50px" alt="play pause" />
      </PlayPauseButton>
      <DrumLoopLabel htmlFor="drum-loop-select">
        Choose a Drum Loop
      </DrumLoopLabel>
      <DrumLoopSelect
        name="drum-loops"
        id="drum-loop-select"
        onChange={getDrumLoop}
      >
        <option>--- select your Loop ---</option>
        <option>Strings90BPM</option>
        <option>DrumLoop90BPM</option>
        <option>GS-Mixdown94BPM</option>
        <option>GS-Mixdown98BPM</option>
        <option>DirtyBass120BPM</option>
      </DrumLoopSelect>
    </DrumLoopContainer>
  );

  function startDrumLoop() {
    if (isPlayin === playbutton) {
      Tone.loaded().then(() => {
        loopPlayer.current.start();
      });
      setIsPlayin(pausebutton);
    } else {
      loopPlayer.current.stop();
      setIsPlayin(playbutton);
    }
  }
  function getDrumLoop(event) {
    setCurrentDrumLoop(event.target.value);
    loopPlayer.current.stop();
    setIsPlayin(playbutton);
  }
}

const DrumLoopContainer = styled.div`
  display: grid;
  max-width: 450px;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 1fr 2fr;
  margin: 20px;
  padding: 10px;
  border: 2px solid white;
  border-radius: 10px;
`;

const PlayPauseButton = styled.button`
  background: none;
  border: none;
  grid-column: 1;
  grid-row: 1 / 3;
`;
const DrumLoopLabel = styled.label`
  grid-column: 2;
  grid-row: 0 / 1;
`;

const DrumLoopSelect = styled.select`
  text-align: center;
  height: 30px;
  max-width: 250px;
  color: white;
  background-color: black;
  border: 1px solid white;
  border-radius: 5px;
  align-self: start;
  grid-column: 2;
  grid-row: 2 / 3;
`;
