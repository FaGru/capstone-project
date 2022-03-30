import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function SequencerPad({ id, color, sequencerPadClick }) {
  return (
    <Pad
      animate={{ scale: [0.2,  1] }}
      transition={{ duration: 1 }}
      type="button"
      aria-label="sequencer-pad"
      data-testid="sequencer-pad"
      onClick={sequencerPadClick}
      value={id}
      color={color}
      key={id}
    ></Pad>
  );
}

const Pad = styled(motion.button)`
  background: var(--${props => props.color});
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 100px;
  box-shadow: inset 0 0 20px var(--${props => props.color}-active);
  cursor: grab;

  &:active {
    transition: ease-in 0.05s;
    background: var(--${props => props.color}-active);
    box-shadow: 0 0 5px 2px var(--${props => props.color});
    cursor: grabbing;
  }
  @media (max-width: 500px) {
    width: 22vw;
    height: 22vw;
  }
`;
