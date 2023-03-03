import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StyledButtonImg, InvisibleButton } from '../Buttons';
import BurgerMenuNavbar from '../BurgerMenuNavbar/BurgerMenuNavbar';

import settingsLogo from '../../images/settings.svg';
import recordingsLogo from '../../images/recording-page.svg';
import sequencerLogo from '../../images/sequencer.svg';
import djLogo from '../../images/dj-page.svg';
import drumMachineLogo from '../../images/drum-machine.svg';
import nanoBeatsLogo from '../../images/nano-beats-logo.svg';
import burgerMenuLogo from '../../images/burger-menu.svg';
import useStore from '../../hooks/useStore';

export default function Navbar() {
  const {
    currentPage,
    isBurgerMenuVisible,
    setCurrentPage,
    setIsBurgerMenuVisible,
  } = useStore(state => state);

  return (
    <div>
      <LinkContainer>
        <NavLink to="/">
          <NanoBeatsLogo
            src={nanoBeatsLogo}
            height="70px"
            width="70px"
            alt="Nano-Beats"
            currentpage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavLink>
        <NavLink to="localhost:4000/en">
          <NanoBeatsLogo
            src={nanoBeatsLogo}
            height="70px"
            width="70px"
            alt="Nano-Beats"
            currentpage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavLink>
        <NavigationLink to="/sequencer">
          <NavbarImage
            src={sequencerLogo}
            height="55px"
            width="55px"
            alt="sequencer"
            currentpage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavigationLink>
        <NavigationLink to="/drum-machine">
          <NavbarImage
            src={drumMachineLogo}
            height="55px"
            width="55px"
            alt="drum-machine"
            currentpage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavigationLink>
        <NavigationLink to="/dj">
          <NavbarImage
            src={djLogo}
            height="55px"
            width="55px"
            alt="dj"
            currentpage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavigationLink>
        <NavigationLink to="/recordings">
          <NavbarImage
            src={recordingsLogo}
            height="55px"
            width="55px"
            alt="recordings"
            currentpage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavigationLink>
        <NavigationLink to="/settings">
          <NavbarImage
            src={settingsLogo}
            height="55px"
            width="55px"
            alt="settings"
            currentpage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavigationLink>
        <BurgerMenuButton
          onClick={() => setIsBurgerMenuVisible(!isBurgerMenuVisible)}
        >
          <StyledButtonImg
            src={burgerMenuLogo}
            height="50px"
            width="50px"
            alt="burger menu"
          />
        </BurgerMenuButton>
        {isBurgerMenuVisible && <BurgerMenuNavbar />}
      </LinkContainer>
    </div>
  );
}
const LinkContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--darkgray);
  border-bottom: 1px solid var(--gray);
  @media (max-width: 600px) {
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 10px;
  }
`;
const NanoBeatsLogo = styled.img`
  text-decoration: none;
  color: var(--black);
  font-size: 2rem;
  border: 2px solid var(--white);
  border-radius: 15px;
  margin: 3px;
`;
const NavbarImage = styled(StyledButtonImg)`
  background-color: ${props =>
    props.alt === props.currentpage && 'var(--blue)'};
`;
const BurgerMenuButton = styled(InvisibleButton)`
  @media (min-width: 601px) {
    display: none;
  }
`;
const NavigationLink = styled(NavLink)`
  margin-left: 50px;
  @media (max-width: 600px) {
    display: none;
  }
`;
