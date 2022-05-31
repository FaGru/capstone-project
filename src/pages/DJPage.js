import DJPlayerOne from '../components/DJPlayerOne/DJPlayerOne';
import DJPlayerTwo from '../components/DJPlayerTwo/DJPlayerTwo';
import DJControls from '../components/DJControls/DJControls';
import { StyledButtonImg } from '../components/Buttons';
import backIcon from '../images/back.svg';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import useStore from '../hooks/useStore';

export default function DJPage() {
  const [visiblePlayer, setVisiblePlayer] = useState(1);
  const { djPlayerOne, djPlayerTwo, isMIDIAssignButtonActive } = useStore(
    state => state
  );
  const setIsMIDIAssignButtonActive = useStore(
    state => state.setIsMIDIAssignButtonActive
  );

  return (
    <>
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
        onClick={() => setIsMIDIAssignButtonActive(isMIDIAssignButtonActive)}
      >
        Assign MIDI controls
      </MIDIButton>
      <PageContainer visible={visiblePlayer}>
        <DJPlayerOne
          visiblePlayer={visiblePlayer}
          setVisiblePlayer={setVisiblePlayer}
        />
        <DJControls />
        <DJPlayerTwo
          visiblePlayer={visiblePlayer}
          setVisiblePlayer={setVisiblePlayer}
        />
      </PageContainer>
    </>
  );

  function handleNavigate() {
    djPlayerOne.stop();
    djPlayerTwo.stop();
  }
}
const PageContainer = styled.div`
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
  background-color: ${props => (props.isActive ? 'red' : 'white')};
`;
