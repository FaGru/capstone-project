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
        <img src={isPlayin} height="40px" width="40px" alt="play pause" />
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
  background-color: var(--black);
  display: grid;
  grid-column: 2 / 3;
  max-width: 260px;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr 2fr;
  margin: 20px;
  padding: 5px;
  border: 2px solid var(--white);
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
  max-width: 200px;
  color: white;
  background-color: var(--black);
  border: 1px solid var(--white);
  border-radius: 5px;
  align-self: start;
  grid-column: 2;
  grid-row: 2 / 3;
  box-shadow: var(--box-shadow-classic);
`;
