import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StyledButtonImg } from '../Buttons';

import settingsLogo from '../../images/settings.svg';
import recordingsLogo from '../../images/recording-page.svg';
import sequencerLogo from '../../images/sequencer.svg';
import djLogo from '../../images/dj-page.svg';
import drumMachineLogo from '../../images/drum-machine.svg';
import nanoBeatsLogo from '../../images/nano-beats-logo.svg';
import useStore from '../../hooks/useStore';

export default function Navbar() {
  const { currentPage, setCurrentPage } = useStore(state => state);

  return (
    <div>
      <LinkContainer>
        <NavLink to="/">
          <NanoBeatsLogo
            src={nanoBeatsLogo}
            height="70px"
            width="70px"
            alt="Nano-Beats"
            currentPage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavLink>
        <NavLink to="/sequencer">
          <NavbarImage
            src={sequencerLogo}
            height="55px"
            width="55px"
            alt="sequencer"
            currentPage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavLink>
        <NavLink to="/drum-machine">
          <NavbarImage
            src={drumMachineLogo}
            height="55px"
            width="55px"
            alt="drum-machine"
            currentPage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavLink>
        <NavLink to="/dj">
          <NavbarImage
            src={djLogo}
            height="55px"
            width="55px"
            alt="dj"
            currentPage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavLink>
        <NavLink to="/recordings">
          <NavbarImage
            src={recordingsLogo}
            height="55px"
            width="55px"
            alt="recordings"
            currentPage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavLink>
        <NavLink to="/settings">
          <NavbarImage
            src={settingsLogo}
            height="55px"
            width="55px"
            alt="settings"
            currentPage={currentPage}
            onClick={event => setCurrentPage(event.target.alt)}
          />
        </NavLink>
      </LinkContainer>
    </div>
  );
}
const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--darkgray);
  border-bottom: 1px solid var(--gray);
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
    props.alt === props.currentPage && 'var(--blue)'};
`;
