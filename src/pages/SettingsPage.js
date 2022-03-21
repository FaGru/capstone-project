import PadSettings from '../components/PadSettings';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import backLogo from '../images/back.svg';
import styled from 'styled-components';
import * as Tone from 'tone';

export default function SettingsPage({
  allPads,
  setAllPads,
  setStoragedPadSettings,
}) {
  const [selectedPad, setSelectedPad] = useState('0');
  const [padColor, setPadColor] = useState('blue');
  const [selectedSample, setSelectedSample] = useState(
    './audio/Samples/Backspin1.wav'
  );

  return (
    <>
      <HeadingContainer>
        <BackButton to="/">
          <img src={backLogo} alt="back-button" width="35px" height="35px" />
        </BackButton>
        <Heading>Settings</Heading>
      </HeadingContainer>
    <SettingsContainer>
      <PadSettings
        savePadClick={savePadClick}
        colorChange={colorChange}
        padChange={padChange}
        sampleChange={sampleChange}
        allPads={allPads}
        selectedSample={selectedSample}
        samplePreview={samplePreview}
      />
    </SettingsContainer>
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
    setAllPads(sortedPads);
    setStoragedPadSettings(sortedPads);
  }
  function samplePreview() {
    const player = new Tone.Player(selectedSample).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }
}

const HeadingContainer = styled.header`
  display: grid;
  grid-template-columns: 15% 1fr 15%;
  
`;
const Heading = styled.h2`
  margin-top: 32px;
  text-align: center;
  grid-column: 2 / 3;
`;
const BackButton = styled(NavLink)`
  margin: 15px;
  justify-self: start;
  grid-column: 1 / 2;
  
`;
  const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `;