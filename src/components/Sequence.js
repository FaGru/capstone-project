import styled from 'styled-components';

export default function Sequencer({
  color,
  isActive,
  value,
  updateSequenceClick,
}) {
  return (
    <Button
      type="button"
      data-testid="sequencer-button"
      aria-label="sequencer-button"
      onClick={updateSequenceClick}
      value={value}
      isActive={isActive}
      color={color}
    ></Button>
  );
}

const Button = styled.button`
  background: none;
  background-color: ${props => (props.isActive ? props.color : 'none')};
  border: 2px solid var(--gray);
  border-radius: 5px;
  width: 50px;
  height: 50px;

  @media (max-width: 500px) {
    width: 11vw;
    height: 11vw;
  }
`;
