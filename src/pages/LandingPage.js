import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useStore from '../hooks/useStore';
import backround from '../images/background.jpg';
import { motion } from 'framer-motion';

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
      <H1>
        Welcome to <br />
        <span>NanoBeats</span>
      </H1>
      <LandingPageButton
        animate={{ x: [-1000, 50, 0] }}
        transition={{ duration: 0.4 }}
        type="button"
        onClick={() => navigate('/drum-machine', { replace: true })}
      >
        {' '}
        DrumMachine
      </LandingPageButton>
      <LandingPageButton
        animate={{ x: [1000, -50, 0] }}
        transition={{ duration: 0.4, delay: 0.15 }}
        type="button"
        onClick={() => navigate('/sequencer', { replace: true })}
      >
        Sequencer
      </LandingPageButton>
      <LandingPageButton
        animate={{ x: [-1000, 50, 0] }}
        transition={{ duration: 0.4, delay: 0.3 }}
        type="button"
        onClick={() => navigate('/settings', { replace: true })}
      >
        Settings
      </LandingPageButton>
      <LandingPageButton
        animate={{ x: [1000, -50, 0] }}
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
  height: 100vh;
  background-image: url(${backround});
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
`;

const H1 = styled.h1`
  text-align: center;
  margin-top: 70px;
  margin-bottom: 40px;
  font-size: 2rem;
  border-radius: 20px;
  /* box-shadow: 2px 2px 5px 2px #970533;
  background-color: #080405; */
  padding: 5px;

  span {
    margin: 5px;
    background: linear-gradient(
      220deg,
      #df1d5d 10%,
      #970533 15%,
      #a206a3 20%,
      #970533 25%,
      #df1d5d 30%,
      #970533 35%,
      #df1d5d 40%,
      #970533 45%,
      #df1d5d 50%,
      #a206a3 55%,
      #970533 60%,
      #df1d5d 65%,
      #970533 70%,
      #df1d5d 75%,
      #a206a3 90%,
      #970533 95%
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
`;
const LandingPageButton = styled(motion.button)`
  min-width: 260px;
  height: 40px;
  border-radius: 15px;
  border: 2px solid var(--darkgray);
  background-color: #080405;
  color: #c40820;
  font-weight: bold;

  box-shadow: 1.5px 1.5px 3px;

  &:hover {
    background: linear-gradient(
      220deg,
      #970533 10%,
      #a206a3 30%,
      #df1d5d 50%,
      #a206a3 70%,
      #970533 90%
    );
    color: #080405;
  }
`;
