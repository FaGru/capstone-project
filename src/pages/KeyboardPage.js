import KeyboardButtons from '../components/KeyboardButtons';
import styled from 'styled-components';
import useStore from '../hooks/useStore';

export default function KeyboardboardPage() {
  const synth = useStore(state => state.synth);
  const monoSynth = useStore(state => state.monoSynth);
  const setKeyboardVolume = useStore(state => state.setKeyboardVolume);
  const keyboardVolume = useStore(state => state.keyboardVolume);

  return (
    <KeyboardContainer>
      <label htmlFor="keyboard-volume">Volume: {keyboardVolume}</label>
      <VolumeRange
        name="keyboard-volume"
        id="keyboard-volume"
        type="range"
        min="0"
        max="100"
        value={keyboardVolume * 10}
        onChange={handleKeyboardVolume}
      ></VolumeRange>
      <KeyboardButtons keyboardClick={keyboardClick} />
    </KeyboardContainer>
  );
  function keyboardClick(event) {
    const currentButton = event.target.value;
    monoSynth.triggerAttackRelease(currentButton, '8n');
    synth.triggerAttackRelease(currentButton, '8n');
  }
  function handleKeyboardVolume(e) {
    setKeyboardVolume(e.target.value / 10);
  }
}
const KeyboardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--darkgray);
  border: 2px solid var(--lightgray);
  padding: 20px;
  margin: 20px;
  @media (orientation: portrait) {
    display: none;
  }
`;
const VolumeRange = styled.input`
  width: 30%;
  margin-bottom: 20px;
`;
