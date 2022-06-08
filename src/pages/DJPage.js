import DJPlayerOne from '../components/DJPlayerOne/DJPlayerOne';
import DJPlayerTwo from '../components/DJPlayerTwo/DJPlayerTwo';
import DJControls from '../components/DJControls/DJControls';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import NavAnimation from '../components/FramerMotion';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useStore from '../hooks/useStore';
import Navbar from '../components/Navbar';

export default function DJPage() {
  const [visiblePlayer, setVisiblePlayer] = useState(1);
  const { isMIDIAssignButtonActive, setIsMIDIAssignButtonActive } = useStore(
    state => state
  );

  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 800) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 800) {
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
      <Navbar />
      <NavAnimation start="initialRight" end="outRight">
        <PageContainer>
          <HeaderContainer>
            <MIDIButton
              isActive={isMIDIAssignButtonActive}
              onClick={setIsMIDIAssignButtonActive}
            >
              Assign <br />
              MIDI-Control
            </MIDIButton>
          </HeaderContainer>

          <DeviceContainer>
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
          </DeviceContainer>
        </PageContainer>
      </NavAnimation>
    </>
  );
}

const PageContainer = styled.main`
  display: grid;
  justify-content: center;
`;

const DeviceContainer = styled(BackgroundAnimation)`
  position: relative;
  display: flex;
  place-content: center;
  gap: 5px;
  padding: 5px;
  margin-top: 20px;
  max-width: 1000px;
  @media (max-width: 800px) {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

const MIDIButton = styled.button`
  grid-column: 2 / 3;
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
  margin-top: 20px;
  @media (max-width: 800px) {
    display: none;
  }
`;
