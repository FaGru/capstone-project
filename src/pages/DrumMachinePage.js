import DrumLoopPlayer from '../components/DrumLoopPlayer';
import DrumPad from '../components/DrumPad';
import RecordButton from '../components/RecordButton';
import VolumeControl from '../components/VolumeControl';
import InstructionsDrumMachine from '../components/InstructionsDrumMachine';

import { StyledButtonImg, InvisibleButton } from '../components/Buttons';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import * as Tone from 'tone';
import { useState } from 'react';
import useStore from '../hooks/useStore';

import settingsLogo from '../images/settings.svg';
import recordingsLogo from '../images/recording-page.svg';
import volumeLogo from '../images/EQ.svg';
import sequencerLogo from '../images/sequencer.svg';
import infoLogo from '../images/information.svg';

export default function DrumMachinePage() {
  const [devicesState, setDevicesState] = useState('');
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const recorder = useStore(state => state.recorder);
  const saveRecording = useStore(state => state.saveRecording);

  const initLoopPlayer = useStore(state => state.initLoopPlayer);
  const loopPlayer = useStore(state => state.loopPlayer);
  const getCurrentDrumLoop = useStore(state => state.getCurrentDrumLoop);
  const getLoopPlayerVolume = useStore(state => state.getLoopPlayerVolume);

  const drumPadPlayers = useStore(state => state.drumPadPlayers);
  const getDrumPadPlayersVolume = useStore(
    state => state.getDrumPadPlayersVolume
  );
  const allPads = useStore(state => state.allPads);

  return (
    <DrumMachineContainer>
      <InstructionsDrumMachine />
      <LandingPageLink to="/">
        <img src={infoLogo} height="30px" width="30px" alt="landingpage" />
      </LandingPageLink>
      <LinkContainer>
        <NavLink onClick={handleNavigate} to="/sequencer">
          <StyledButtonImg
            src={sequencerLogo}
            height="55px"
            width="55px"
            alt="sequencer"
          />
        </NavLink>
        <NavLink onClick={handleNavigate} to="/recordings">
          <StyledButtonImg
            src={recordingsLogo}
            height="55px"
            width="55px"
            alt="recordings"
          />
        </NavLink>
        <InvisibleButton
          type="button"
          onClick={() => setIsControlsVisible(!isControlsVisible)}
        >
          <StyledButtonImg
            src={volumeLogo}
            height="55px"
            width="55px"
            alt="volume-settings"
          />
        </InvisibleButton>
        <NavLink onClick={handleNavigate} to="/settings">
          <StyledButtonImg
            src={settingsLogo}
            height="55px"
            width="55px"
            alt="settings"
          />
        </NavLink>
      </LinkContainer>
      <VolumeControl
        isControlsVisible={isControlsVisible}
        setIsControlsVisible={setIsControlsVisible}
        handlePadVolume={handlePadVolume}
        handleLoopPlayerVolume={handleLoopPlayerVolume}
      />
      <PadList>
        {allPads.map(pad => (
          <DrumPad
            key={pad.id}
            id={pad.id}
            color={pad.color}
            sample={pad.sample}
            drumPadClick={drumPadClick}
          />
        ))}
      </PadList>

      <RecordButton
        recordStartClick={recordStartClick}
        recordStopClick={recordStopClick}
        devicesState={devicesState}
        setDevicesState={setDevicesState}
      />
      <DrumLoopPlayer startDrumLoop={startDrumLoop} getDrumLoop={getDrumLoop} />
    </DrumMachineContainer>
  );

  ////////////////////drumPad////////////////////
  function drumPadClick(event) {
    const currentPlayer = event.target.value;
    Tone.loaded().then(() => {
      drumPadPlayers.player(`Player${currentPlayer}`).start();
    });
  }
  ////////////////////drumPad////////////////////

  ////////////////////record////////////////////
  function recordStartClick() {
    recorder.start();
  }

  function recordStopClick() {
    recorder.stop();
    saveRecording();
  }
  ////////////////////record////////////////////

  ////////////////////DrumLoop////////////////////
  function startDrumLoop(isPlaying) {
    isPlaying
      ? loopPlayer.stop()
      : Tone.loaded().then(() => {
          loopPlayer.start();
        });
  }
  function getDrumLoop(currentLoop) {
    loopPlayer.stop();
    getCurrentDrumLoop(currentLoop);
    initLoopPlayer();
  }
  function handleNavigate() {
    loopPlayer.stop();
  }
  ////////////////////DrumLoop////////////////////
  function handlePadVolume(e) {
    getDrumPadPlayersVolume(e.target.value / 10);
  }

  function handleLoopPlayerVolume(e) {
    getLoopPlayerVolume(e.target.value / 10);
  }
}

const DrumMachineContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr auto auto;
  border: 2px solid var(--lightgray);
  background-color: var(--darkgray);
  position: relative;
  margin-top: 15px;
  @media (max-width: 1000px) {
    @media (orientation: landscape) {
      display: none;
    }
  }
`;
const LinkContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const PadList = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  max-width: 450px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
`;
const LandingPageLink = styled(NavLink)`
  position: absolute;
  background-color: var(--black);
  border-radius: 100%;
  top: -15px;
  right: -5px;
`;
