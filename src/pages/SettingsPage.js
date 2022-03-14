import PadSettings from '../components/PadSettings';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import backButton from '../images/back.svg';
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
    <SettingsContainer>
      <HeadingContainer>
        <LinkButton to="/">
          <img src={backButton} alt="back-button" width="35px" height="35px" />
        </LinkButton>
        <Heading>Settings</Heading>
      </HeadingContainer>
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

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const HeadingContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`
const Heading = styled.h2`
  margin-top: 32px;
  margin-right: 100px;
  text-align: center
`
const LinkButton = styled(NavLink)`
  margin: 30px;
`;
