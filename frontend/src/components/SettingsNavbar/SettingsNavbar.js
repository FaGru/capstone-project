import styled from 'styled-components';
import useStore from '../../hooks/useStore';

export default function SettingsNavbar() {
  const { visibleSettings, setVisibleSettings } = useStore(state => state);

  return (
    <>
      <NavList>
        <NavButton
          active={visibleSettings === 'DrumPads' ? true : false}
          onClick={handleClick}
        >
          DrumPads
        </NavButton>
        <NavButton
          active={visibleSettings === 'User' ? true : false}
          onClick={handleClick}
        >
          User
        </NavButton>
        <NavButton
          active={visibleSettings === 'MIDI-Settings' ? true : false}
          onClick={handleClick}
        >
          MIDI-Settings
        </NavButton>
      </NavList>
    </>
  );
  function handleClick(e) {
    setVisibleSettings(e.target.textContent);
  }
}
const NavList = styled.section`
  grid-column: 1 / 4;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 2px solid var(--gray);
`;
const NavButton = styled.button`
  transition: ease 0.3s;
  color: ${props => (props.active ? 'var(--green)' : 'var(--white)')};
  background-color: var(--black);
  border-radius: 5px;
  border: 1px solid ${props => (props.active ? 'var(--green)' : 'var(--white)')};
  box-shadow: 1px 1px 5px 0.5px
    ${props => (props.active ? 'var(--green)' : 'var(--white)')};
  letter-spacing: 1px;
  cursor: pointer;
`;
