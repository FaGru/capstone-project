import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StyledButtonImg, InvisibleButton } from '../components/Buttons';

import settingsLogo from '../images/settings.svg';
import recordingsLogo from '../images/recording-page.svg';
import sequencerLogo from '../images/sequencer.svg';
import djLogo from '../images/dj-page.svg';
import drumMachineLogo from '../images/drum-machine.svg';
import nanoBeatsLogo from '../images/nano-beats-logo.svg';

export default function Navbar() {
  return (
    <div>
      <LinkContainer>
        <NavLink to="/">
          <NanoBeatsLogo
            src={nanoBeatsLogo}
            height="70px"
            width="70px"
            alt="Nano-Beats"
          />
        </NavLink>
        <NavLink to="/sequencer">
          <StyledButtonImg
            src={sequencerLogo}
            height="55px"
            width="55px"
            alt="sequencer"
          />
        </NavLink>
        <NavLink to="/drum-machine">
          <StyledButtonImg
            src={drumMachineLogo}
            height="55px"
            width="55px"
            alt="drum-machine"
          />
        </NavLink>
        <NavLink to="/dj">
          <StyledButtonImg
            src={djLogo}
            height="55px"
            width="55px"
            alt="dj-logo"
          />
        </NavLink>
        <NavLink to="/recordings">
          <StyledButtonImg
            src={recordingsLogo}
            height="55px"
            width="55px"
            alt="recordings"
          />
        </NavLink>
        <NavLink to="/settings">
          <StyledButtonImg
            src={settingsLogo}
            height="55px"
            width="55px"
            alt="settings"
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
  margin: 5px;
`;
