import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useStore from '../../hooks/useStore';

export default function DrumPad({ id, color, drumPadClick }) {
  const [isDesktop, setDesktop] = useState(false);
  const { isMIDIAssignButtonActive, setNewMIDIControlFunction } = useStore(
    state => state
  );

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
          isMIDIAssignActive={isMIDIAssignButtonActive}
          type="button"
          aria-label={`drum pad`}
          onMouseDown={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(drumPadClick, 'normal', id)
              : drumPadClick(event.target.value)
          }
          value={id}
          color={color}
          key={id}
        ></Pad>
      ) : (
        <Pad
          isMIDIAssignActive={isMIDIAssignButtonActive}
          type="button"
          aria-label={`drum pad`}
          onTouchStart={event =>
            isMIDIAssignButtonActive
              ? setNewMIDIControlFunction(drumPadClick, 'normal', id)
              : drumPadClick(event.target.value)
          }
          value={id}
          color={color}
          key={id}
        ></Pad>
      )}
    </>
  );
}

const Pad = styled.button`
  background: var(--${props => props.color});
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 100px;
  box-shadow: inset 0 0 20px var(--${props => props.color}-active);
  cursor: grab;
  ${props =>
    props.isMIDIAssignActive &&
    'background-color: var(--purple); box-shadow: inset 0 0 20px 2px var(--purple)'};

  &:active {
    transition: ease-in 0.05s;
    background: var(--${props => props.color}-active);
    box-shadow: 0 0 5px 2px var(--${props => props.color});
    cursor: grabbing;
    ${props =>
      props.isMIDIAssignActive &&
      'background-color: var(--purple); box-shadow: inset 0 0 20px 2px var(--purple-active)'};
  }
  @media (max-width: 500px) {
    width: 28vw;
    height: 28vw;
  }
`;
