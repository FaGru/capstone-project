import * as Tone from 'tone';
import styled from 'styled-components';


export default function KeyboardboardPage() {
  const synth = new Tone.Synth({
    volume: -2,
    detune: 0,
    portamento: 0.05,
    envelope: {
      attack: 0.05,
      attackCurve: 'exponential',
      decay: 0.2,
      decayCurve: 'exponential',
      release: 1.5,
      releaseCurve: 'exponential',
      sustain: 0.2,
    },
    oscillator: {
      partialCount: 0,
      partials: [],
      phase: 0,
      type: 'amtriangle',
      harmonicity: 0.5,
      modulationType: 'sine',
    },
  }).toDestination();

  const mono = new Tone.MonoSynth({
    volume: -3,
    detune: 0,
    portamento: 0,
    envelope: {
      attack: 0.05,
      attackCurve: 'linear',
      decay: 0.3,
      decayCurve: 'exponential',
      release: 0.8,
      releaseCurve: 'exponential',
      sustain: 0.4,
    },
    filter: {
      Q: 1,
      detune: 0,
      frequency: 0,
      gain: 0,
      rolloff: -12,
      type: 'lowpass',
    },
    filterEnvelope: {
      attack: 0.001,
      attackCurve: 'linear',
      decay: 0.7,
      decayCurve: 'exponential',
      release: 0.8,
      releaseCurve: 'exponential',
      sustain: 0.1,
      baseFrequency: 300,
      exponent: 2,
      octaves: 4,
    },
    oscillator: {
      detune: 0,
      frequency: 700,
      partialCount: 8,
      partials: [
        1.2732395447351628, 0, 0.4244131815783876, 0, 0.25464790894703254, 0,
        0.18189136353359467, 0,
      ],
      phase: 0,
      type: 'square8',
    },
  }).toDestination();

  // synth.volume.value = -6;
  // const distortion = new Tone.Distortion(0);

  // synth.chain(distortion, Tone.Destination);

  return (
    <>
      <ButtonContainer>
        <Button value="C3" onMouseDown={handleClick}>
          C3
        </Button>

        <Button value="D3" onMouseDown={handleClick}>
          D3
        </Button>
        <Button value="E3" onMouseDown={handleClick}>
          E3
        </Button>
        <Button value="F3" onMouseDown={handleClick}>
          F3
        </Button>
        <Button value="G3" onMouseDown={handleClick}>
          G3
        </Button>
        <Button value="A3" onMouseDown={handleClick}>
          A3
        </Button>
        <Button value="B3" onMouseDown={handleClick}>
          B3
        </Button>
        <Button value="C4" onMouseDown={handleClick}>
          C4
        </Button>
        <Button value="D4" onMouseDown={handleClick}>
          D4
        </Button>
        <Button value="E4" onMouseDown={handleClick}>
          E4
        </Button>
        <Button value="F4" onMouseDown={handleClick}>
          F4
        </Button>
        <Button value="G4" onMouseDown={handleClick}>
          G4
        </Button>
        <Button value="A4" onMouseDown={handleClick}>
          A4
        </Button>
        <Button value="B4" onMouseDown={handleClick}>
          B4
        </Button>
        <BlackButtonGrid>
          <BlackButton value="C#3" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="D#3" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="F#3" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="G#3" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="A#3" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="C#4" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="D#4" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="F#4" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="G#4" onMouseDown={handleClick}></BlackButton>
          <BlackButton value="A#4" onMouseDown={handleClick}></BlackButton>
        </BlackButtonGrid>
      </ButtonContainer>
    </>
  );
  function handleClick(event) {
    const currentButton = event.target.value;
    mono.triggerAttackRelease(currentButton, '8n');
    synth.triggerAttackRelease(currentButton, '8n');
  }
}
const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  background-color: var(--darkgray);
  border: 2px solid var(--gray);
  padding: 20px;

  @media (orientation: portrait) {
    display: none;
  }
`;
const BlackButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 45px 90px 45px 45px 90px 45px 90px 45px 45px 35px;
  position: absolute;
`;

const Button = styled.button`
  height: 200px;
  width: 45px;
  z-index: 1;
  border: 1px solid var(--black);
  border-top: none;
  background-color: white;
  &:active {
    transition: ease 0.1s;
    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(to bottom, white, #b6b6b6bd, #141414, black) 1
      100%;
  }
`;

const BlackButton = styled.button`
  height: 150px;
  width: 35px;
  background-color: var(--black);
  z-index: 2000;
  border: 1px solid var(--gray);
  border-top: none;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(37, 36, 36, 1) 49%,
    rgba(0, 0, 0, 1) 100%
  );

  &:active {
    transition: 0.1s;
    border-width: 1.5px;
    border-style: solid;
    border-image: linear-gradient(to top, white, #b6b6b6bd, black) 1 100%;
  }
`;
