import { useState } from 'react';
import styled from 'styled-components';

import EQ from '../images/EQ.svg';
import recordingLogo from '../images/recording-page.svg';
import sequencerLogo from '../images/sequencer.svg';
import settingsLogo from '../images/settings.svg';

import { useNavigate } from 'react-router-dom';
import useStore from '../hooks/useStore';

export default function InstructionsDrumMachine() {
  let navigate = useNavigate('');

  const [isNavVisible, setIsNavVisible] = useState(false);
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
  const isInstructionPopUpVisible = useStore(
    state => state.isInstructionPopUpVisible
  );
  const setInstructionPopUpVisible = useStore(
    state => state.setInstructionPopUpVisible
  );

  return (
    <>
      <PopUp visible={isInstructionPopUpVisible}>
        New?
        <PopUpButton type="button" onClick={instructionClick}>
          click for Instructions
        </PopUpButton>
        <PopUpButton
          type="button"
          onClick={() => setInstructionPopUpVisible(false)}
        >
          X
        </PopUpButton>
      </PopUp>
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
        on a piano. <br /> And now Have fun 😉
      </LastInstruction>

      <DoneButton
        type="button"
        visible={isInstructionFiveVisible}
        onClick={exitClick}
      >
        DONE
      </DoneButton>
      <ExitButton type="button" visible={isNavVisible} onClick={exitClick}>
        EXIT
      </ExitButton>
      <NextButton type="button" visible={isNavVisible} onClick={nextClick}>
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
    setIsNavVisible(false);
    setInstructionTwoVisible(false);
    setInstructionFiveVisible(false);
  }

  function instructionClick() {
    setInstructionOneVisible(true);
    setIsNavVisible(true);
    setInstructionPopUpVisible(false);
  }
}
const PopUp = styled.div`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  padding: 5px;
  background-color: var(--black);
  border: 2px solid var(--red);
  border-radius: 10px;
  max-width: 320px;
  text-align: center;
  padding-left: 10px;
  top: 2%;
  left: 5%;
`;
const PopUpButton = styled.button`
  background: none;
  color: red;
  margin-left: 20px;
  padding: 5px;
`;

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
  left: 3%;
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
  right: 3%;
`;
const DoneButton = styled.button`
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

  top: 55%;
  left: 40%;
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
