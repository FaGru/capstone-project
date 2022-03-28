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
          animate={{ opacity: [0, 1, 0.2, 1, 1], scale: [0.2, 1, 1, 1] }}
          transition={{ duration: 1.5 }}
          type="button"
          aria-label={`drum pad`}
          onMouseDown={drumPadClick}
          value={id}
          color={color}
          key={id}
        ></Pad>
      ) : (
        <Pad
          animate={{ opacity: [0, 1, 0.2, 1, 1], scale: [0.2, 1, 1, 1] }}
          transition={{ duration: 1.5 }}
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
  box-shadow: var(--box-shadow-classic);

  &:active {
    transition: ease-in 0.05s;
    background: var(--${props => props.color}-active);
    box-shadow: 0 0 5px 2px var(--${props => props.color});
  }
  @media (max-width: 500px) {
    width: 30vw;
    height: 30vw;
  }
`;
