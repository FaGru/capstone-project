import styled from 'styled-components';

export default function SeuencerPad({ id, color }) {
  return (
    <Pad
      type="button"
      aria-label="sequencer-pad"
      value={id}
      color={color}
      key={id}
    ></Pad>
  );
}

const Pad = styled.button`
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
    width: 22vw;
    height: 22vw;
  }
`;
