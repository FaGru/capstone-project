import NavAnimation from '../components/FramerMotion';

import useStore from '../hooks/useStore';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import backround from '../images/background.jpg';

export default function LandingPage() {
  const setInstructionOneVisible = useStore(
    state => state.setInstructionOneVisible
  );
  const setIsInstructionNavVisible = useStore(
    state => state.setIsInstructionNavVisible
  );

  return (
    <NavAnimation end="outTop">
      <LandingPageContainer>
        <H1>
          Welcome to <br />
          <span>NanoBeats</span>
        </H1>
        <Link type="button" to="/drum-machine">
          <LandingPageButton
            animate={{ x: [-1000, 50, 0] }}
            transition={{ duration: 0.4 }}
          >
            DrumMachine
          </LandingPageButton>
        </Link>
        <Link type="button" to="/sequencer">
          <LandingPageButton
            animate={{ x: [1000, -50, 0] }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            Sequencer
          </LandingPageButton>
        </Link>
        <Link type="button" to="/settings">
          <LandingPageButton
            animate={{ x: [-1000, 50, 0] }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Settings
          </LandingPageButton>
        </Link>
        <Link type="button" to="/dj">
          <LandingPageButton
            animate={{ x: [1000, 50, 0] }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            DJ-Deck
          </LandingPageButton>
        </Link>
        <Link onClick={instructionClick} to="/drum-machine">
          <LandingPageButton
            animate={{ x: [-1000, -50, 0] }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            Instructions
          </LandingPageButton>
        </Link>
      </LandingPageContainer>
    </NavAnimation>
  );

  function instructionClick() {
    setInstructionOneVisible(true);
    setIsInstructionNavVisible(true);
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
  box-shadow: inset 2px 2px 100px 10px var(--black);
  padding: 10px;

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
const Link = styled(NavLink)`
  text-decoration: none;
`;

const LandingPageButton = styled(motion.div)`
  min-width: 260px;
  height: 40px;
  border-radius: 15px;
  border: 2px solid var(--darkgray);
  background-color: #080405;
  box-shadow: 1.5px 1.5px 3px #c40820;
  cursor: pointer;
  text-align: center;
  padding: 8px;
  color: #c40820;
  font-weight: bold;

  &:hover {
    color: #080405;
    background: linear-gradient(
      220deg,
      #970533 10%,
      #a206a3 30%,
      #df1d5d 50%,
      #a206a3 70%,
      #970533 90%
    );
  }
`;
