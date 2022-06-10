import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import closeLogo from '../../images/close.svg';

export default function BurgerMenuNavbar() {
  const { currentPage, setCurrentPage, setIsBurgerMenuVisible } = useStore(
    state => state
  );
  return (
    <>
      <Container>
        <CloseImage
          src={closeLogo}
          alt="close"
          height="20px"
          width="20px"
          onClick={setIsBurgerMenuVisible}
        />
        <Navigation
          to="/sequencer"
          name="sequencer"
          currentpage={currentPage}
          onClick={event => setCurrentPage(event.target.name)}
        >
          Sequencer
        </Navigation>
        <Navigation
          to="/drum-machine"
          name="drum-machine"
          currentpage={currentPage}
          onClick={event => setCurrentPage(event.target.name)}
        >
          DrumMachine
        </Navigation>
        <Navigation
          to="/dj"
          name="dj"
          currentpage={currentPage}
          onClick={event => setCurrentPage(event.target.name)}
        >
          DJ-Deck
        </Navigation>
        <Navigation
          to="/recordings"
          name="recordings"
          currentpage={currentPage}
          onClick={event => setCurrentPage(event.target.name)}
        >
          Recordings
        </Navigation>
        <Navigation
          to="/settings"
          name="settings"
          currentpage={currentPage}
          onClick={event => setCurrentPage(event.target.name)}
        >
          Settings
        </Navigation>
      </Container>
    </>
  );
}

const Container = styled.section`
  display: flex;
  position: absolute;

  top: 80px;
  left: 50%;
  transform: translate(-50%);
  flex-direction: column;
  z-index: 5;
  width: 300px;
  border: 2px solid var(--lightgray);
  border-radius: 10px;
  background-color: var(--darkgray);
  @media (min-width: 601px) {
    display: none;
  }
`;

const Navigation = styled(NavLink)`
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  color: var(--white);
  padding: 10px;
  border-radius: 10px;
  ${props =>
    props.name === props.currentpage &&
    'background-color: var(--blue); color: var(--black)'};
  &:hover {
    ${props =>
      props.name !== props.currentpage &&
      'background-color: var(--yellow-active); color: var(--black)'};
  }
`;
const CloseImage = styled.img`
  place-self: end;
  margin: 10px 10px 2px 0;
  cursor: pointer;
`;
