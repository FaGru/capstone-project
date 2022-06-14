import EQ from '../../images/EQ.svg';
import recordingLogo from '../../images/recording-page.svg';
import sequencerLogo from '../../images/sequencer.svg';
import settingsLogo from '../../images/settings.svg';
import { InstructionNavButton } from '../Buttons';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/useStore';

export default function InstructionsDrumMachine() {
  let navigate = useNavigate('');

  const setIsInstructionNavVisible = useStore(
    state => state.setIsInstructionNavVisible
  );
  const isInstructionNavVisible = useStore(
    state => state.isInstructionNavVisible
  );

  const setInstructionThreeVisible = useStore(
    state => state.setInstructionThreeVisible
  );
  const isInstructionOneVisible = useStore(
    state => state.isInstructionOneVisible
  );
  const setInstructionOneVisible = useStore(
    state => state.setInstructionOneVisible
  );
  const isInstructionTwoVisible = useStore(
    state => state.isInstructionTwoVisible
  );
  const setInstructionTwoVisible = useStore(
    state => state.setInstructionTwoVisible
  );
  const isInstructionFiveVisible = useStore(
    state => state.isInstructionFiveVisible
  );
  const setInstructionFiveVisible = useStore(
    state => state.setInstructionFiveVisible
  );

  return (
    <>
      <IPhoneInstruction visible={isInstructionOneVisible}>
        If you are using an iPhone, please turn off silent mode to use the app
      </IPhoneInstruction>

      <InstructionOne visible={isInstructionOneVisible}>
        click on <br />
        <img src={EQ} alt="volume-settings" height="25px" width="25px" />
        <br />
        to change the volume
      </InstructionOne>
      <InstructionTwo visible={isInstructionOneVisible}>
        click on a pad to play a sample
      </InstructionTwo>
      <InstructionThree visible={isInstructionOneVisible}>
        choose a Drum-Loop and click play to have a background sound
      </InstructionThree>
      <InstructionFour visible={isInstructionOneVisible}>
        click here to record your session
      </InstructionFour>
      <InstructionFive visible={isInstructionTwoVisible}>
        click on <br />
        <img src={sequencerLogo} alt="recording" height="25px" width="25px" />
        <br /> to get to the sequencer page
      </InstructionFive>
      <InstructionSix visible={isInstructionTwoVisible}>
        click on <br />
        <img src={settingsLogo} alt="recording" height="25px" width="25px" />
        <br /> to get to the drum pad settings
      </InstructionSix>
      <InstructionSeven visible={isInstructionTwoVisible}>
        click on <br />
        <img src={recordingLogo} alt="recording" height="25px" width="25px" />
        <br /> to get to the recordings page
      </InstructionSeven>
      <LastInstruction visible={isInstructionFiveVisible}>
        If you are on a mobile device, then you can rotate it to be able to play
        on a piano. <br /> And now have fun 😉
      </LastInstruction>

      <DoneButton
        type="button"
        visible={isInstructionFiveVisible}
        onClick={exitClick}
      >
        DONE
      </DoneButton>
      <ExitButton
        type="button"
        visible={isInstructionNavVisible}
        onClick={exitClick}
      >
        EXIT
      </ExitButton>
      <NextButton
        type="button"
        visible={isInstructionNavVisible}
        onClick={nextClick}
      >
        NEXT
      </NextButton>
    </>
  );
  function nextClick() {
    if (isInstructionOneVisible === true) {
      setInstructionOneVisible(false);
      setInstructionTwoVisible(true);
    } else {
      navigate('/settings', { replace: true });
      setInstructionThreeVisible(true);
    }
    if (isInstructionTwoVisible === true) {
      setInstructionTwoVisible(false);
    }
  }

  function exitClick() {
    setInstructionOneVisible(false);
    setIsInstructionNavVisible(false);
    setInstructionTwoVisible(false);
    setInstructionFiveVisible(false);
  }
}

const ExitButton = styled(InstructionNavButton)`
  top: 48%;
  left: 3%;
`;
const NextButton = styled(InstructionNavButton)`
  top: 48%;
  right: 3%;
`;
const DoneButton = styled(InstructionNavButton)`
  top: 55%;
  left: 38%;
`;

const InstructionOne = styled.p`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  top: 10%;
  left: 35%;
`;
const IPhoneInstruction = styled(InstructionOne)`
  width: 250px;
  top: 32%;
  left: 15%;
`;

const InstructionTwo = styled(InstructionOne)`
  width: 110px;
  top: 45%;
  left: 35%;
`;
const InstructionThree = styled(InstructionOne)`
  width: 180px;
  top: 72%;
  left: 42%;
`;
const InstructionFour = styled(InstructionOne)`
  width: 120px;
  top: 72%;
  left: 2%;
`;

const InstructionFive = styled(InstructionOne)`
  width: 150px;
  top: 11%;
  left: 2%;
`;
const InstructionSix = styled(InstructionOne)`
  width: 150px;
  top: 11%;
  left: 52%;
`;
const InstructionSeven = styled(InstructionOne)`
  width: 150px;
  top: 28%;
  left: 30%;
`;
const LastInstruction = styled(InstructionOne)`
  width: 200px;
  top: 34%;
  left: 20%;
`;
