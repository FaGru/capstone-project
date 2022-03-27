import styled from 'styled-components';

export default function Sequencer({
  color,
  updateSequenceClick,
  currentTimeStemp,
  selectedPadSequence,
}) {
  return (
    <>
      {selectedPadSequence.map(sequence => (
        <SequencerButton
          type="button"
          data-testid="sequencer-button"
          aria-label="sequencer-button"
          onClick={updateSequenceClick}
          color={color}
          key={sequence.id}
          value={sequence.value}
          isActive={sequence.isActive}
          currentTimeStemp={currentTimeStemp}
        ></SequencerButton>
      ))}
    </>
  );
}

const SequencerButton = styled.button`
  background: none;
  background-color: ${props =>
    props.isActive ? 'var(--' + props.color + ')' : 'none'};
  border: 2px solid
    ${props =>
      props.currentTimeStemp === props.value ? 'var(--orange)' : 'var(--gray)'};
  box-shadow: ${props =>
    props.currentTimeStemp === props.value
      ? '0px 0px 5px 3px var(--green-active)'
      : 'none'};
  border-radius: 5px;
  width: 50px;
  height: 50px;

  @media (max-width: 500px) {
    width: 11vw;
    height: 11vw;
  }
`;
