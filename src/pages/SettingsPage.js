import PadSettings from '../components/PadSettings';
import InstructionPadSettings from '../components/InstructionsPadSettings';
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
    <PageContainer>
      <HeadingContainer>
        <NavLink to="/">
          <StyledButtonImg
            src={backLogo}
            alt="back-button"
            width="45px"
            height="45px"
          />
        </NavLink>
        <Heading>Settings</Heading>
      </HeadingContainer>
      <SettingsContainer>
        <InstructionPadSettings />
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
    </PageContainer>
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

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`;

const HeadingContainer = styled.header`
  grid-column: 1 / 4;
  display: grid;
  grid-template-columns: 15% 1fr 15%;
`;
const Heading = styled.h2`
  margin-top: 32px;
  text-align: center;
  grid-column: 2 / 3;
`;
const StyledButtonImg = styled.img`
  transition: ease 0.4s;
  border: 1px solid var(--gray);
  border-bottom: 3px solid var(--gray);
  border-right: 3px solid var(--gray);
  border-radius: 100%;
  padding: 3px;

  &:active {
    transition: ease 0.2s;
    border-top: 3px solid var(--gray);
    border-left: 3px solid var(--gray);
  }
`;
const SettingsContainer = styled.main`
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
`;
