import KeyboardButtons from '../components/KeyboardButtons';
import styled, { keyframes } from 'styled-components';
import useStore from '../hooks/useStore';
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
const spin = keyframes`
0% {background-position: top center;}
100% {background-position: bottom center;}
`;

const KeyboardContainer = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: var(--darkgray);
  border: 2px solid var(--darkgray);
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: inset 0 0 15px 5px var(--black);
  @media (orientation: portrait) {
    display: none;
  }
  &::before,
  ::after {
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    place-content: center;
    border-radius: 10px;
    position: absolute;
    z-index: -1;
    background-image: linear-gradient(
      15deg,
      #44d62c,
      #099fff,
      #6c90f6,
      #5a05a9,
      #6b0643,
      #6b0643,
      #970533,
      #df1d5d,
      #f631a7
    );
    background-size: 100% 200%;
    background-position: center center;

    animation: ${spin} 10s infinite alternate;
  }
  &::after {
    filter: blur(60px);
  }
`;
const VolumeRange = styled.input`
  width: 30%;
  margin-bottom: 20px;
`;
