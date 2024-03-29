import PadSettings from '../components/PadSettings/PadSettings';
import InstructionPadSettings from '../components/Instructions/InstructionsPadSettings';
import useStore from '../hooks/useStore';
import Navbar from '../components/Navbar/Navbar';
import NavAnimation from '../components/FramerMotion';
import SettingsNavbar from '../components/SettingsNavbar/SettingsNavbar';
import UserSettings from '../components/UserSettings/UserSettings';
import MidiSettings from '../components/MidiSettings/MidiSettings';
import { BackgroundAnimation } from '../components/BackgroundAnimation';

import { useState } from 'react';
import styled from 'styled-components';
import * as Tone from 'tone';

export default function SettingsPage({ setStoragedPadSettings }) {
  const [selectedPad, setSelectedPad] = useState('0');
  const [padColor, setPadColor] = useState('blue');
  const [selectedSample, setSelectedSample] = useState(
    './audio/Samples/Backspin1.wav'
  );
  const { allPads, setAllPads, visibleSettings } = useStore(state => state);

  return (
    <>
      <Navbar />
      <NavAnimation start="initialBottom" end="outBottom">
        <PageContainer>
          <SettingsNavbar />
          <SettingsContainer>
            <InstructionPadSettings />
            {visibleSettings === 'DrumPads' && (
              <PadSettings
                savePadClick={savePadClick}
                colorChange={colorChange}
                padChange={padChange}
                sampleChange={sampleChange}
                allPads={allPads}
                samplePreview={samplePreview}
              />
            )}
            {visibleSettings === 'User' && <UserSettings />}
            {visibleSettings === 'MIDI-Settings' && <MidiSettings />}
          </SettingsContainer>
        </PageContainer>
      </NavAnimation>
    </>
  );

  function padChange(e) {
    setSelectedPad(e.target.value);
  }
  function colorChange(e) {
    setPadColor(e.target.value);
  }
  function sampleChange(e) {
    setSelectedSample(e.target.value);
  }

  function savePadClick() {
    const newPad = {
      id: selectedPad,
      color: padColor,
      sample: selectedSample,
    };
    const notRemovedPads = allPads.filter(pad => pad.id !== newPad.id);
    const sortedPads = [...notRemovedPads, newPad];
    sortedPads.sort(function (a, b) {
      return a.id - b.id;
    });

    setStoragedPadSettings(sortedPads);
    setAllPads(sortedPads);
    useStore.getState().initDrumPadPlayers();
  }
  function samplePreview() {
    const player = new Tone.Player(selectedSample).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }
}

const PageContainer = styled(BackgroundAnimation)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  max-width: 350px;
  margin: 5vh auto 5vh auto;
  background-color: var(--darkgray);
  border-radius: 10px;
  box-shadow: inset 0 0 20px 1px var(--black);
`;

const SettingsContainer = styled.main`
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
`;
