import styled from 'styled-components';

export default function DrumLoopPlayer({
  startDrumLoop,
  getDrumLoop,
  isPlayin,
}) {
  return (
    <DrumLoopContainer>
      <PlayPauseButton
        type="button"
        onClick={startDrumLoop}
        aria-label="play pause"
      >
        <img src={isPlayin} height="35px" width="35px" alt="play pause" />
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
}

const DrumLoopContainer = styled.div`
  justify-self: center;
  background-color: var(--gray);
  display: grid;
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  width: 250px;
  height: 55px;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr 2fr;
  margin: 10px;
  padding: 3px;
  border: 2px solid var(--white);
  border-radius: 40px;
`;

const PlayPauseButton = styled.button`
  background: none;
  border: none;
  grid-column: 1;
  grid-row: 1 / 3;
`;
const DrumLoopLabel = styled.label`
  font-size: 0.8rem;
  grid-column: 2;
  grid-row: 0 / 1;
`;

const DrumLoopSelect = styled.select`
  text-align: center;
  height: 25px;
  max-width: 160px;
  color: var(--white);
  background-color: var(--lightgray);
  border: 1px solid var(--white);
  border-radius: 5px;
  align-self: start;
  grid-column: 2;
  grid-row: 2 / 3;
  box-shadow: var(--box-shadow-classic);
`;
