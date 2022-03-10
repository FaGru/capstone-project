import styled from 'styled-components';

export default function DrumPad({key, color, drumPadClick, sample }) {
  
  return (

      <Pad
        aria-label={`drum pad ${key}`}
        onClick={drumPadClick}
        value={sample}
        color={color}
      />
 
  );
}

const Pad = styled.button`
  background-color: var(--${props => props.color});
  border: none;
  border-radius: 5px;
  width: 150px;
  height: 150px;
  opacity: 100%;

  &:active {
    opacity: 100%;
    background-color: var(--${props => props.color}-active);
    box-shadow: 0 0 5px 2px var(--${props => props.color});
  }
  @media (max-width: 500px) {
    width: 30vw;
    height: 30vw;
  }
`;
