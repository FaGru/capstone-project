import styled from 'styled-components';
import useStore from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';
import backLogo from '../images/back-right.svg';
import controlsLogo from '../images/EQ.svg';
import { InstructionNavButton } from './Buttons';

export default function InstructionsSequencer() {
  let navigate = useNavigate('');
  const isInstructionFourVisible = useStore(
    state => state.isInstructionFourVisible
  );
  const setInstructionFourVisible = useStore(
    state => state.setInstructionFourVisible
  );
  const setInstructionFiveVisible = useStore(
    state => state.setInstructionFiveVisible
  );
  const setIsInstructionNavVisible = useStore(
    state => state.setIsInstructionNavVisible
  );

  return (
    <>
      <InstructionOne isVisible={isInstructionFourVisible}>
        click on <br />
        <img src={backLogo} alt="back" height="25px" width="25px" />
        <br />
        to get back to the Drum Machine
      </InstructionOne>
      <InstructionTwo isVisible={isInstructionFourVisible}>
        click on <br />
        <img src={controlsLogo} alt="controls" height="25px" width="25px" />
        <br />
        to change the BPM (speed) of the Sequencer
      </InstructionTwo>
      <InstructionThree isVisible={isInstructionFourVisible}>
        here you can insert your selected sample in several places. It will be
        played as soon as the Sequencer reaches the marked point.
      </InstructionThree>
      <InstructionFour isVisible={isInstructionFourVisible}>
        here you can select a sample which can be placed in the Sequencer
      </InstructionFour>

      <ExitButton
        type="button"
        visible={isInstructionFourVisible}
        onClick={exitClick}
      >
        EXIT
      </ExitButton>
      <NextButton
        type="button"
        visible={isInstructionFourVisible}
        onClick={nextClick}
      >
        NEXT
      </NextButton>
    </>
  );
  function nextClick() {
    setInstructionFourVisible(false);
    setInstructionFiveVisible(true);
    setIsInstructionNavVisible(false)
    navigate('/drum-machine', { replace: true });
  }
  function exitClick() {
    setInstructionFourVisible(false);
  }
}

const ExitButton = styled(InstructionNavButton)`
  top: 48%;
  left: 5%;
`;
const NextButton = styled(InstructionNavButton)`
  top: 48%;
  right: 5%;
`;

const InstructionOne = styled.p`
  ${props => (props.isVisible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  width: 140px;
  top: 0%;
  left: 40%;
  @media (min-width: 650px) {
    left: 70%;
  } ;
`;
const InstructionTwo = styled(InstructionOne)`
  top: 9%;
  left: 5%;
  @media (min-width: 650px) {
    left: 20%;
    top: 0%;
  } ;
`;
const InstructionThree = styled(InstructionOne)`
  width: 180px;
  top: 20%;
  left: 50%;
`;
const InstructionFour = styled(InstructionOne)`
  top: 60%;
  left: 55%;
`;
