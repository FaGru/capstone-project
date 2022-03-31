import KeyboardButtons from '../components/KeyboardButtons';
import { BackgroundAnimation } from '../components/BackgroundAnimation';

import useStore from '../hooks/useStore';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function KeyboardboardPage() {
  const synth = useStore(state => state.synth);
  const monoSynth = useStore(state => state.monoSynth);
  const setKeyboardVolume = useStore(state => state.setKeyboardVolume);
  const keyboardVolume = useStore(state => state.keyboardVolume);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
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
    </motion.div>
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

const KeyboardContainer = styled(BackgroundAnimation)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: var(--darkgray);
  border: 2px solid var(--darkgray);
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: inset 0 0 15px 5px var(--black);

  @media (min-width: 1000px) {
    margin-left: 80px;
  }
  @media (orientation: portrait) {
    display: none;
  }
`;
const VolumeRange = styled.input`
  width: 30%;
  margin-bottom: 20px;
`;
