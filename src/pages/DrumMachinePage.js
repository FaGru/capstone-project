import DrumLoopPlayer from '../components/DrumLoopPlayer';
import DrumPad from '../components/DrumPad';
import settingsButton from '../images/settings.svg';
import { NavLink } from 'react-router-dom';
import * as Tone from 'tone';
import styled from 'styled-components';

export default function DrumMachinePage({ padSettings }) {



  return (
    <DrumMachineContainer>
      <LinkButton to="/settings">
        <img src={settingsButton} height="50px" width="50px" alt="settings" />
      </LinkButton>
      <PadList>
        {padSettings.map(pad => (
          <DrumPad
            key={pad.id}
            id={pad.id}
            color={pad.color}
            sample={pad.sample}
            drumPadClick={drumPadClick}
          ></DrumPad>
          
        ))}
      </PadList>

      <DrumLoopPlayer />
    </DrumMachineContainer>
  );

  function drumPadClick(event) {
    const currentPad = event.target.value;
    const player = new Tone.Player(currentPad).toDestination();
    player.autostart = true;
  }
}

const DrumMachineContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr auto;
`;
const LinkButton = styled(NavLink)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: end;
  padding-top: 20px;
  padding-right: 20px;
`;
const PadList = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  max-width: 450px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  margin: 15px;
`;
