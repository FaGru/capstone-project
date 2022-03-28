import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useStore from '../hooks/useStore';
import backround from '../images/background.jpg';

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
        type="button"
        onClick={() => navigate('/drum-machine', { replace: true })}
      >
        DrumMachine
      </LandingPageButton>
      <LandingPageButton
        type="button"
        onClick={() => navigate('/sequencer', { replace: true })}
      >
        Sequencer
      </LandingPageButton>
      <LandingPageButton
        type="button"
        onClick={() => navigate('/settings', { replace: true })}
      >
        Settings
      </LandingPageButton>
      <LandingPageButton type="button" onClick={instructionClick}>
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
const LandingPageButton = styled.button`
  min-width: 260px;
  height: 40px;
  border-radius: 15px;
  background-color: var(--darkgray);
  color: var(--red);
  box-shadow: 1px 1px 5px;

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
