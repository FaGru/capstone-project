import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DrumPad({ id, color, drumPadClick }) {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 450) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 450) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <>
      {isDesktop ? (
        <Pad
          animate={{ scale: [0.2, 1] }}
          transition={{ delay: 0.5, duration: 1 }}
          type="button"
          aria-label={`drum pad`}
          onMouseDown={drumPadClick}
          value={id}
          color={color}
          key={id}
        ></Pad>
      ) : (
        <Pad
          animate={{ scale: [0.2, 1] }}
          transition={{ delay: 0.5, duration: 1 }}
          type="button"
          aria-label={`drum pad`}
          onTouchStart={drumPadClick}
          value={id}
          color={color}
          key={id}
        ></Pad>
      )}
    </>
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
    width: 28vw;
    height: 28vw;
  }
`;
