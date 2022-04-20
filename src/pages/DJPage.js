import DJPlayer from '../components/DJPlayer';
import useStore from '../hooks/useStore';

export default function DJPage() {
  const faderPosition = useStore(state => state.faderPosition);
  const setFaderPosition = useStore(state => state.setFaderPosition);
  return (
    <>
      <DJPlayer faderPosition={faderPosition} />
      <input
        id='"dj-player-fader"'
        type="range"
        min="-50"
        max="50"
        defaultValue={faderPosition}
        onChange={handlePlayerFader}
      ></input>
      <label htmlFor="dj-player-fader">{faderPosition}</label>
    </>
  );

  function handlePlayerFader(e) {
    setFaderPosition(e.target.value);
  }
}
