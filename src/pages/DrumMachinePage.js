import React from 'react';
import styled from 'styled-components';
import * as Tone from 'tone';
import DrumPad from '../components/DrumPad';

export default function DrumMachine() {
  return (
    <PadList>
      <DrumPad
        handleClick={handleClick}
        value={'../audio/Samples/Scratch1.wav'}
      />
      <DrumPad handleClick={handleClick} value={'./audio/Samples/Horn1.mp3'} />
      <DrumPad
        handleClick={handleClick}
        value={'./audio/Samples/SynthShot1.wav'}
      />
      <DrumPad
        handleClick={handleClick}
        value="./audio/Samples/CongaFinger.wav"
      />
      <DrumPad
        handleClick={handleClick}
        value="./audio/Samples/BassShot3.wav"
      />
      <DrumPad
        handleClick={handleClick}
        value="./audio/Samples/BassShot2.wav"
      />
      <DrumPad handleClick={handleClick} value="./audio/Samples/Clap1.wav" />
      <DrumPad handleClick={handleClick} value="./audio/Samples/Brass1.wav" />
      <DrumPad handleClick={handleClick} value="./audio/Samples/Brass2.wav" />
      <DrumPad handleClick={handleClick} value="./audio/Samples/Kick1.wav" />
      <DrumPad handleClick={handleClick} value="./audio/Samples/Snare1.wav" />
      <DrumPad handleClick={handleClick} value="./audio/Samples/Vocal1.wav" />
    </PadList>
  );

  function handleClick(event) {
    const currentPad = event.target.value;
    const player = new Tone.Player(currentPad).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }
}

const PadList = styled.div`
  display: grid;
  max-width: 450px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;


  grid-gap: 5px;
  margin: 15px;
`;
