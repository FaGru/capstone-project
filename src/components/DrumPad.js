import styled from 'styled-components';

export default function DrumPad({ id, color, drumPadClick, sample }) {

  return (

      <Pad
        aria-label={`drum pad`}
        onClick={drumPadClick}
        value={sample}
        color={color}
        key={id}
      />
 
  );
}

const Pad = styled.button`
  background-color: var(--${props => props.color});
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 100px;
  box-shadow: var(--box-shadow-classic);
  

  &:active {
    background-color: var(--${props => props.color}-active);
    box-shadow: 0 0 5px 2px var(--${props => props.color});
  }
  @media (max-width: 500px) {
    width: 30vw;
    height: 30vw;
  }
`;
