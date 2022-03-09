import DrumLoopPlayer from '../components/DrumLoopPlayer';
import DrumPads from '../components/DrumPads';
import * as Tone from 'tone';

export default function DrumMachine() {
  return (
    <>
      <DrumPads handleClick={handleClick}/> 
      <DrumLoopPlayer />
    </>
  );

function handleClick(event) {
    const currentPad = event.target.value;
    const player = new Tone.Player(currentPad).toDestination();
    player.autostart = true;
  }
}

