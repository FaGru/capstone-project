import useStore from '../hooks/useStore';
import * as Tone from 'tone';

export default function DJPlayer() {
  const djPlayerOne = useStore(state => state.djPlayerOne);
  const djPlayerTwo = useStore(state => state.djPlayerTwo);
  const setTrackOne = useStore(state => state.setDjTrackOne);
  const setTrackTwo = useStore(state => state.setDjTrackTwo);
  const initDJPlayerOne = useStore(state => state.initDJPlayerOne);
  const initDJPlayerTwo = useStore(state => state.initDJPlayerTwo);
  console.log(djPlayerOne);

  return (
    <>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <input onChange={handleTrackOne} type="file"></input>
      <button onClick={handlePlayOne}>Play</button>
      <input onChange={handleTrackTwo} type="file"></input>
      <button onClick={handlePlayTwo}>Play</button>
    </>
  );
  function handlePlayOne() {
    Tone.loaded().then(() => {
      djPlayerOne.start();
    });
  }
  function handlePlayTwo() {
    djPlayerTwo.start();
  }
  function handleTrackOne(e) {
    djPlayerOne.stop();
    const files = e.target.files;
    setTrackOne(URL.createObjectURL(files[0]));
    initDJPlayerOne();
    
  }
  function handleTrackTwo(e) {
    djPlayerTwo.stop();
    const files = e.target.files;
    setTrackTwo(URL.createObjectURL(files[0]));
    initDJPlayerTwo();
  }
}
