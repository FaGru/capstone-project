import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { motion } from 'framer-motion';

export default function BurgerMenuNavbar() {
  const { currentPage, setCurrentPage } = useStore(state => state);
  return (
    <Container
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <Navigation
        to="/sequencer"
        name="sequencer"
        currentPage={currentPage}
        onClick={event => setCurrentPage(event.target.name)}
      >
        Sequencer
      </Navigation>
      <Navigation
        to="/drum-machine"
        name="drum-machine"
        currentPage={currentPage}
        onClick={event => setCurrentPage(event.target.name)}
      >
        DrumMachine
      </Navigation>
      <Navigation
        to="/dj"
        name="dj"
        currentPage={currentPage}
        onClick={event => setCurrentPage(event.target.name)}
      >
        DJ-Deck
      </Navigation>
      <Navigation
        to="/recordings"
        name="recordings"
        currentPage={currentPage}
        onClick={event => setCurrentPage(event.target.name)}
      >
        Recordings
      </Navigation>
      <Navigation
        to="/settings"
        name="settings"
        currentPage={currentPage}
        onClick={event => setCurrentPage(event.target.name)}
      >
        Settings
      </Navigation>
    </Container>
  );
}

const Container = styled(motion.section)`
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 80px;
  z-index: 5;
  width: 300px;
  border: 2px solid var(--lightgray);
  border-radius: 10px;
  background-color: var(--darkgray);
`;

const Navigation = styled(NavLink)`
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  color: var(--white);
  padding: 10px;
  border-radius: 10px;
  ${props =>
    props.name === props.currentPage &&
    'background-color: var(--blue); color: var(--black)'};
  &:hover {
    ${props =>
      props.name !== props.currentPage &&
      'background-color: var(--yellow-active); color: var(--black)'};
  }
`;
