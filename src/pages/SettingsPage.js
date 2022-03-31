import PadSettings from '../components/PadSettings';
import InstructionPadSettings from '../components/InstructionsPadSettings';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backLogo from '../images/back.svg';
import styled, { keyframes } from 'styled-components';
import * as Tone from 'tone';
import useStore from '../hooks/useStore';
import { StyledButtonImg, InvisibleButton } from '../components/Buttons';
import NavAnimation from '../components/FramerMotion';

export default function SettingsPage({ setStoragedPadSettings }) {
  const [selectedPad, setSelectedPad] = useState('0');
  const [padColor, setPadColor] = useState('blue');
  const [selectedSample, setSelectedSample] = useState(
    './audio/Samples/Backspin1.wav'
  );
  const allPads = useStore(state => state.allPads);
  const setAllPads = useStore(state => state.setAllPads);
  const navigate = useNavigate();

  return (
    <NavAnimation start="initialRight" end="outRight">
      <PageContainer>
        <HeadingContainer>
          <InvisibleButton type="button" onClick={() => navigate(-1)}>
            <StyledButtonImg
              src={backLogo}
              alt="back-button"
              width="45px"
              height="45px"
            />
          </InvisibleButton>
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
    </NavAnimation>
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
const animation = keyframes`
0% {background-position: top center;}
100% {background-position: bottom center;}
`;
const PageContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: 90vh;
  width: 95vw;
  margin: 5vh auto 5vh auto;
  background-color: var(--darkgray);
  border-radius: 10px;
  box-shadow: inset 0 0 20px 1px var(--black);
  &::before,
  ::after {
    content: '';
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-image: linear-gradient(
      15deg,
      #44d62c,
      #099fff,
      #6c90f6,
      #5a05a9,
      #6b0643,
      #6b0643,
      #970533,
      #df1d5d,
      #f631a7
    );
    background-size: 100% 200%;
    background-position: center center;
    animation: ${animation} 10s infinite alternate;
  }
  &::after {
    filter: blur(60px);
  }
`;

const HeadingContainer = styled.header`
  grid-column: 1 / 4;
  display: grid;
  grid-template-columns: 15% 1fr 15%;
  margin-left: 10px;
  margin-right: 10px;
`;
const Heading = styled.h2`
  text-align: center;
  grid-column: 2 / 3;
  align-self: center;
`;

const SettingsContainer = styled.main`
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
`;
