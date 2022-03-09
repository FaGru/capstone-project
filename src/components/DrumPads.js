import styled from 'styled-components';

export default function DrumPads({ drumPadClick }) {
  return (
    <PadList>
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value={'./audio/Samples/Scratch1.wav'}
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value={'./audio/Samples/Horn1.mp3'}
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value={'./audio/Samples/SynthShot1.wav'}
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/CongaFinger.wav"
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/BassShot3.wav"
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/BassShot2.wav"
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/Clap1.wav"
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/Brass1.wav"
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/Brass2.wav"
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/Kick1.wav"
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/Snare1.wav"
      />
      <DrumPad
        aria-label="Drum Pad"
        onClick={drumPadClick}
        value="./audio/Samples/Vocal1.wav"
      />
    </PadList>
  );
}

const DrumPad = styled.button`
  background-color: #4895ef;
  border: none;
  border-radius: 5px;
  width: 150px;
  height: 150px;
  opacity: 90%;

  &:active {
    opacity: 100%;
    box-shadow: 0 0 5px 2px #4895ef;
  }
  @media (max-width: 500px) {
    width: 30vw;
    height: 30vw;
  }
`;
const PadList = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  max-width: 450px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  margin: 15px;
`;
