import styled from 'styled-components';
import useStore from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';
import backLogo from '../images/back.svg';

export default function InstructionsPadSettings() {
  let navigate = useNavigate('');
  const isInstructionThreeVisible = useStore(
    state => state.isInstructionThreeVisible
  );
  const setInstructionThreeVisible = useStore(
    state => state.setInstructionThreeVisible
  );
  const setInstructionFourVisible = useStore(
    state => state.setInstructionFourVisible
  );

  return (
    <>
      <InstructionOne isVisible={isInstructionThreeVisible}>
        click on <br />
        <img src={backLogo} alt="back" height="25px" width="25px" />
        <br />
        to get back to the Drum Machine
      </InstructionOne>
      <InstructionTwo isVisible={isInstructionThreeVisible}>
        click on play preview to listen to the currently selected sample
      </InstructionTwo>
      <InstructionThree isVisible={isInstructionThreeVisible}>
        here you can see the layout of the drum pads and their current colors
      </InstructionThree>
      <InstructionFour isVisible={isInstructionThreeVisible}>
        here you can choose a drum pad and assign it a new color and sample
      </InstructionFour>

      <ExitButton type='button' visible={isInstructionThreeVisible} onClick={exitClick}>
        EXIT
      </ExitButton>
      <NextButton type='button' visible={isInstructionThreeVisible} onClick={nextClick}>
        NEXT
      </NextButton>
    </>
  );
  function nextClick() {
    setInstructionThreeVisible(false);
    setInstructionFourVisible(true);
    navigate('/sequencer', { replace: true });
  }
  function exitClick() {
    setInstructionThreeVisible(false);
  }
}

const ExitButton = styled.button`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  padding: 5px;
  color: var(--red);
  background-color: white;
  border: 2px solid var(--red);
  border-radius: 10px;
  width: 70px;
  height: 40px;
  font-size: 1.2rem;

  top: 48%;
  left: -15%;
`;
const NextButton = styled.button`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  padding: 5px;
  color: var(--red);
  background-color: white;
  border: 2px solid var(--red);
  border-radius: 10px;
  width: 70px;
  height: 40px;
  font-size: 1.2rem;

  top: 48%;
  right: -15%;
`;

const InstructionOne = styled.p`
  ${props => (props.isVisible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  width: 160px;
  top: -20%;
  left: 20%;
`;
const InstructionTwo = styled(InstructionOne)`
  top: 20%;
  left: -15%;
`;
const InstructionThree = styled(InstructionOne)`
  top: 20%;
  left: 55%;
`;
const InstructionFour = styled(InstructionOne)`
  top: 55%;
  left: 55%;
`;
