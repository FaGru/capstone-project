import DrumLoopPlayer from '../components/DrumLoopPlayer';
import DrumPad from '../components/DrumPad';
import RecordButton from '../components/RecordButton';
import VolumeControl from '../components/VolumeControl';
import InstructionsDrumMachine from '../components/InstructionsDrumMachine';
import NavAnimation from '../components/FramerMotion';
import { BackgroundAnimation } from '../components/BackgroundAnimation';

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

export default function DrumMachinePage() {
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const recorder = useStore(state => state.recorder);
  const saveRecording = useStore(state => state.saveRecording);

  const initLoopPlayer = useStore(state => state.initLoopPlayer);
  const loopPlayer = useStore(state => state.loopPlayer);
  const setCurrentDrumLoop = useStore(state => state.setCurrentDrumLoop);
  const setLoopPlayerVolume = useStore(state => state.setLoopPlayerVolume);

  const drumPadPlayers = useStore(state => state.drumPadPlayers);
  const setDrumPadPlayersVolume = useStore(
    state => state.setDrumPadPlayersVolume
  );
  const allPads = useStore(state => state.allPads);

  const setNavDirection = useStore(state => state.setNavDirection);
  const navDirection = useStore(state => state.navDirection);

  return (
    <>
      <NavAnimation start={navDirection.start} end={navDirection.end}>
        <DrumMachineContainer>
          <BackButton onClick={handleNavigate} to="/">
            NanoBeats
          </BackButton>
          <InstructionsDrumMachine />
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
            <NavLink
              value={['outLeft', 'initialLeft']}
              onClick={handleNavigate}
              to="/settings"
            >
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
          <RecLoopContainer>
            <RecordButton
              recordStartClick={recordStartClick}
              recordStopClick={recordStopClick}
            />

            <DrumLoopPlayer
              startDrumLoop={startDrumLoop}
              getDrumLoop={getDrumLoop}
            />
          </RecLoopContainer>
        </DrumMachineContainer>
      </NavAnimation>
    </>
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
    setCurrentDrumLoop(currentLoop);
    initLoopPlayer();
  }
  function handleNavigate(event) {
    loopPlayer.stop();
    if (event.target.alt === 'sequencer') {
      setNavDirection({ start: 'initialRight', end: 'outRight' });
    } else if (event.target.alt === 'settings') {
      setNavDirection({ start: 'initialLeft', end: 'outLeft' });
    } else {
      setNavDirection({ start: 'initialTop', end: 'outTop' });
    }
  }
  function handlePadVolume(e) {
    setDrumPadPlayersVolume(e.target.value / 2);
  }

  function handleLoopPlayerVolume(e) {
    setLoopPlayerVolume(e.target.value / 2);
  }
}

const DrumMachineContainer = styled(BackgroundAnimation)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr auto auto;
  border: 2px solid var(--darkgray);
  border-radius: 10px;
  background-color: var(--darkgray);
  position: relative;
  margin-top: 70px;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: inset 0 0 15px 5px var(--black);

  @media (max-width: 1000px) {
    @media (orientation: landscape) {
      display: none;
    }
  }
`;
const BackButton = styled(NavLink)`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translate(-50%);
  text-decoration: none;
  color: var(--black);
  font-size: 2rem;
  border-right: 3px solid var(--black);
  border-bottom: 4px solid var(--black);
  border-radius: 10px;
  padding: 2px;
  background: linear-gradient(
    200deg,
    #970533 10%,
    #a206a3 30%,
    #df1d5d 50%,
    #a206a3 70%,
    #970533 90%
  );
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  margin: 5px;
`;

const RecLoopContainer = styled.div`
  grid-row: 3 / 4;
  grid-column: 2 /3;
  display: flex;
  justify-content: space-around;
`;
