import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useStore from '../hooks/useStore';
import backround from '../images/background.jpg';
import { motion } from 'framer-motion';
import { type } from '@testing-library/user-event/dist/type';

export default function LandingPage() {
  let navigate = useNavigate();
  const setInstructionOneVisible = useStore(
    state => state.setInstructionOneVisible
  );
  const setIsInstructionNavVisible = useStore(
    state => state.setIsInstructionNavVisible
  );
  return (
    <LandingPageContainer>
      <H1>Welcome to DrumMachine</H1>
      <LandingPageButton
        animate={{ x: [-800, 50, 0] }}
        transition={{ duration: 0.4 }}
        type="button"
        onClick={() => navigate('/drum-machine', { replace: true })}
      >
        {' '}
        DrumMachine
      </LandingPageButton>
      <LandingPageButton
        animate={{ x: [800, -50, 0] }}
        transition={{ duration: 0.4, delay: 0.15 }}
        type="button"
        onClick={() => navigate('/sequencer', { replace: true })}
      >
        Sequencer
      </LandingPageButton>
      <LandingPageButton
        animate={{ x: [-800, 50, 0] }}
        transition={{ duration: 0.4, delay: 0.3 }}
        type="button"
        onClick={() => navigate('/settings', { replace: true })}
      >
        Settings
      </LandingPageButton>
      <LandingPageButton
        animate={{ x: [800, -50, 0] }}
        transition={{ duration: 0.4, delay: 0.45 }}
        type="button"
        onClick={instructionClick}
      >
        Instructions
      </LandingPageButton>
    </LandingPageContainer>
  );

  function instructionClick() {
    setInstructionOneVisible(true);
    setIsInstructionNavVisible(true);

    navigate('/drum-machine', { replace: true });
  }
}

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  height: 98vh;
  background-image: url(${backround});
  background-repeat: no-repeat;
  background-position: center center;
`;

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;
const LandingPageButton = styled(motion.button)`
  min-width: 260px;
  height: 40px;
  border-radius: 15px;
  background-color: var(--darkgray);
  color: yellowgreen;
  box-shadow: 3px 3px 8px 1px;

  &:hover {
    transition: ease 0.4s;
    background-color: var(--white);
    color: var(--darkgray);
  }
  &:active {
    background-color: #e7c500;
    color: var(--black);
  }
`;
