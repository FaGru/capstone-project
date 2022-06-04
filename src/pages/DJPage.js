import DJPlayerOne from '../components/DJPlayerOne/DJPlayerOne';
import DJPlayerTwo from '../components/DJPlayerTwo/DJPlayerTwo';
import DJControls from '../components/DJControls/DJControls';
import { StyledButtonImg } from '../components/Buttons';

import backIcon from '../images/back.svg';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useStore from '../hooks/useStore';

export default function DJPage() {
  const [visiblePlayer, setVisiblePlayer] = useState(1);
  const {
    djPlayerOne,
    djPlayerTwo,
    isMIDIAssignButtonActive,
    setIsMIDIAssignButtonActive,
  } = useStore(state => state);

  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 600) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <>
      <HeaderContainer>
        <NavLink aria-label="back" to="/" onClick={handleNavigate}>
          <BackButtonImg
            src={backIcon}
            alt="back-button"
            width="50px"
            height="50px"
          />
        </NavLink>
        <MIDIButton
          isActive={isMIDIAssignButtonActive}
          onClick={setIsMIDIAssignButtonActive}
        >
          Assign <br />
          MIDI-Control
        </MIDIButton>
      </HeaderContainer>
      <PageContainer visible={visiblePlayer}>
        <DJPlayerOne
          visiblePlayer={visiblePlayer}
          setVisiblePlayer={setVisiblePlayer}
          isDesktop={isDesktop}
        />
        <DJControls />
        <DJPlayerTwo
          visiblePlayer={visiblePlayer}
          setVisiblePlayer={setVisiblePlayer}
          isDesktop={isDesktop}
        />
      </PageContainer>
    </>
  );

  function handleNavigate() {
    djPlayerOne.stop();
    djPlayerTwo.stop();
  }
}

const PageContainer = styled.main`
  display: flex;
  place-content: center;
  gap: 5px;
  padding: 5px;
  @media (max-width: 600px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;
const BackButtonImg = styled(StyledButtonImg)`
  margin: 20px;
`;
const MIDIButton = styled.button`
  align-self: center;
  justify-self: center;
  background-color: ${props =>
    props.isActive ? 'var(--blue-active)' : 'var(--blue)'};
  height: 40px;
  width: 100px;
  border-radius: 5px;
  box-shadow: ${props =>
    props.isActive === true
      ? '0 0 20px 2px var(--blue)'
      : 'inset 0 0 10px 2px var(--blue-active)'};
`;
const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
