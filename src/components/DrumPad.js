import styled from 'styled-components';
import { useState, useEffect } from 'react';

export default function DrumPad({ id, color, drumPadClick, sample }) {
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
          aria-label={`drum pad`}
          onMouseDown={drumPadClick}
          value={sample}
          color={color}
          key={id}
        />
      ) : (
        <Pad
          aria-label={`drum pad`}
          onTouchStart={drumPadClick}
          value={sample}
          color={color}
          key={id}
        />
      )}
    </>
  );
}

const Pad = styled.button`
  background: var(--${props => props.color});
  border: none;
  border-radius: 5px;
  width: 85px;
  height: 85px;
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
