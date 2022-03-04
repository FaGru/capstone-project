import React from 'react'
import styled from 'styled-components'
import * as Tone from 'tone'

export default function DrumMachine() {
  return (
    <PadList>
        <Pad aria-label='Drum Pad 1' onClick={handleClick} value="../audio/Samples/Scratch1.wav"></Pad>
        <Pad aria-label='Drum Pad 2' onClick={handleClick} value="./audio/air-horn-club-sample_1.mp3"></Pad>
        <Pad aria-label='Drum Pad 3' onClick={handleClick} value="./audio/Samples/SynthShot1.wav"></Pad>
        <Pad aria-label='Drum Pad 4' onClick={handleClick} value="./audio/Samples/BassShot1.wav"></Pad>
        <Pad aria-label='Drum Pad 5' onClick={handleClick} value="./audio/Samples/Crash1.wav"></Pad>
        <Pad aria-label='Drum Pad 6' onClick={handleClick} value="./audio/Samples/CongaFinger.wav"></Pad>
        <Pad aria-label='Drum Pad 7' onClick={handleClick} value="./audio/Samples/BassShot3.wav"></Pad>
        <Pad aria-label='Drum Pad 8' onClick={handleClick} value="./audio/Samples/BassShot2.wav"></Pad>
        <Pad aria-label='Drum Pad 9' onClick={handleClick} value="./audio/Samples/Clap1.wav"></Pad>
        <Pad aria-label='Drum Pad 10' onClick={handleClick} value="./audio/Samples/Hihat2.wav"></Pad>
        <Pad aria-label='Drum Pad 11' onClick={handleClick} value="./audio/Samples/Brass1.wav"></Pad>
        <Pad aria-label='Drum Pad 12' onClick={handleClick} value="./audio/Samples/Brass2.wav"></Pad>
        <Pad aria-label='Drum Pad 13' onClick={handleClick} value="./audio/Samples/Kick1.wav"></Pad>
        <Pad aria-label='Drum Pad 14' onClick={handleClick} value="./audio/Samples/Snare1.wav"></Pad>
        <Pad aria-label='Drum Pad 15' onClick={handleClick} value="./audio/Samples/Vocal1.wav"></Pad>
        <Pad aria-label='Drum Pad 16' onClick={handleClick} value="./audio/Samples/Vocal2.wav"></Pad>
    </PadList>
  )



  function handleClick(event) {
    const currentPad = event.target.value;
    const player = new Tone.Player(currentPad).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }
}



const Pad = styled.button`
  width: 22vw;
  height: 22vw;
  background-color: blue;
  border-radius: 5px;
`

const PadList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  justify-items: center;
  grid-gap: 5px;
  margin: 20px;
`
