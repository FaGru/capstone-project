import KeyboardButtons from '../components/KeyboardButtons/KeyboardButtons';
import { BackgroundAnimation } from '../components/BackgroundAnimation';

import useStore from '../hooks/useStore';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function KeyboardboardPage() {
  const {
    keyboardVolume,
    isMIDIAssignButtonActive,
    handleKeyboard,
    setKeyboardVolume,
    setIsMIDIAssignButtonActive,
  } = useStore(state => state);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <KeyboardContainer>
        <MIDIButton
          isActive={isMIDIAssignButtonActive}
          onClick={setIsMIDIAssignButtonActive}
        >
          Assign <br />
          MIDI-Control
        </MIDIButton>
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
        <KeyboardButtons handleKeyboard={handleKeyboard} />
      </KeyboardContainer>
    </motion.div>
  );

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
const MIDIButton = styled.button`
  position: absolute;
  right: 50px;
  background-color: ${props =>
    props.isActive ? 'var(--blue-active)' : 'var(--blue)'};
  height: 40px;
  width: 100px;
  border-radius: 5px;
  box-shadow: ${props =>
    props.isActive === true
      ? '0 0 20px 2px var(--blue)'
      : 'inset 0 0 10px 2px var(--blue-active)'};
`;
