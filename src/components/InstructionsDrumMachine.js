import { useState } from 'react';
import styled from 'styled-components';

import EQ from '../images/EQ.svg';
import recordingLogo from '../images/recording-page.svg';
import sequencerLogo from '../images/sequencer.svg';

import { useNavigate } from 'react-router-dom';

export default function InstructionsDrumMachine() {
  let navigate = useNavigate('');
  const [firstStepsVisible, setFirstStepsVisible] = useState(false);
  const [secondStepsVisible, setSecondStepsVisible] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(true);
  return (
    <>
      <PopUp visible={isPopUpVisible}>
        New? <button onClick={instructionClick}>click for Instructions</button>
        <button onClick={() => setIsPopUpVisible(false)}>X</button>
      </PopUp>
      <InstructionOne visible={firstStepsVisible}>
        click on <br />
        <img src={EQ} alt="volume-settings" height="25px" width="25px" />
        <br />
        to change the volume
      </InstructionOne>
      <InstructionTwo visible={firstStepsVisible}>
        click on a pad to play a sample
      </InstructionTwo>
      <InstructionThree visible={firstStepsVisible}>
        choose a Drum-Loop an click play to have a background sound
      </InstructionThree>
      <InstructionFour visible={firstStepsVisible}>
        click here to record your session
      </InstructionFour>
      <InstructionFive visible={secondStepsVisible}>
        {' '}
        click on <br />
        <img src={sequencerLogo} alt="recording" height="25px" width="25px" />
        <br /> to get to the sequencer page
      </InstructionFive>
      <InstructionSix visible={secondStepsVisible}>
        click on <br />
        <img src={recordingLogo} alt="recording" height="25px" width="25px" />
        <br /> to get to the recordings page
      </InstructionSix>
      <InstructionSeven visible={secondStepsVisible}>
        click on <br />
        <img src={recordingLogo} alt="recording" height="25px" width="25px" />
        <br /> to get to the recordings page
      </InstructionSeven>

      <ExitButton visible={isNavVisible} onClick={exitClick}>
        {' '}
        EXIT
      </ExitButton>
      <NextButton visible={isNavVisible} onClick={nextClick}>
        {' '}
        NEXT
      </NextButton>
    </>
  );
  function nextClick() {
    if (firstStepsVisible === true) {
      setFirstStepsVisible(false);
      setSecondStepsVisible(true);
    } else {
      navigate('/settings', { replace: true });
    }
  }

  function exitClick() {
    setFirstStepsVisible(false);
    setIsNavVisible(false);
    setSecondStepsVisible(false);
  }

  function instructionClick() {
    setFirstStepsVisible(true);
    setIsNavVisible(true);
    setIsPopUpVisible(false);
  }
}
const PopUp = styled.div`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  padding: 5px;
  background-color: var(--black);
  border: 2px solid var(--red);
  border-radius: 10px;
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
/////////////////       First Instructions    ////////////////
const InstructionOne = styled.p`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  top: 10%;
  right: 50px;
`;
const InstructionTwo = styled.p`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  width: 110px;
  top: 35%;
  left: 35%;
`;
const InstructionThree = styled.p`
  ${props => (props.visible ? '' : 'display: none')};
  text-align: center;
  position: absolute;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  width: 180px;
  top: 72%;
  right: 2%;
`;
const InstructionFour = styled.p`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  width: 120px;
  top: 72%;
  left: 2%;
`;
///////////////    Second Instructions   ////////////////
const InstructionFive = styled.p`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  width: 150px;
  top: 11%;
  left: 2%;
`;
const InstructionSix = styled.p`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  width: 150px;
  top: 11%;
  right: 2%;
`;
const InstructionSeven = styled.p`
  ${props => (props.visible ? '' : 'display: none')};
  position: absolute;
  text-align: center;
  padding: 5px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background-color: var(--black);
  width: 150px;
  top: 28%;
  right: 30%;
`;
