import DrumLoopPlayer from '../components/DrumLoopPlayer';
import DrumPad from '../components/DrumPad';
import RecordButton from '../components/RecordButton';
import VolumeControl from '../components/VolumeControl';
import InstructionsDrumMachine from '../components/InstructionsDrumMachine';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import * as Tone from 'tone';
import { useState, useMemo, useEffect } from 'react';
import useStore from '../hooks/useStore';

import settingsLogo from '../images/settings.svg';
import recordingsLogo from '../images/recording-page.svg';
import volumeLogo from '../images/EQ.svg';
import sequencerLogo from '../images/sequencer.svg';


export default function DrumMachinePage({ allPads }) {
  const [currentDrumLoop, setCurrentDrumLoop] = useState('DrumLoop90BPM');
  const [devicesState, setDevicesState] = useState('');
  const [padVolume, setPadVolume] = useState(5);
  const [loopPlayerVolume, setLoopPlayerVolume] = useState(5);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const recorder = useStore(state => state.recorder);
  const dest = useStore(state => state.dest);
  const saveRecording = useStore(state => state.saveRecording)
  

  ///////////////LoopPlayer///////////////
  const loopPlayer = useMemo(
    () =>
      new Tone.Player(
        `./audio/DrumLoops/${currentDrumLoop}.wav`
      ).toDestination(),
    [currentDrumLoop]
  );
  useEffect(() => {
    loopPlayer.loop = true;
    loopPlayer.volume.value = loopPlayerVolume - 5;
  }, [loopPlayer, loopPlayerVolume]);
  ///////////////LoopPlayer///////////////

  ///////////////DrumPadPlayers///////////////
  const drumPadPlayers = useMemo(
    () =>
      new Tone.Players(
        {
          Player0: allPads[0].sample,
          Player1: allPads[1].sample,
          Player2: allPads[2].sample,
          Player3: allPads[3].sample,
          Player4: allPads[4].sample,
          Player5: allPads[5].sample,
          Player6: allPads[6].sample,
          Player7: allPads[7].sample,
          Player8: allPads[8].sample,
          Player9: allPads[9].sample,
          Player10: allPads[10].sample,
          Player11: allPads[11].sample,
        },
        {
          volume: padVolume - 5,
        }
      ).toDestination(),
    [allPads, padVolume]
  );
  ///////////////DrumPadPlayers///////////////

  useEffect(() => {
    if (loopPlayer && dest && drumPadPlayers) {
      drumPadPlayers.connect(dest);
      loopPlayer.connect(dest);
    }
  }, [dest, loopPlayer, drumPadPlayers]);

  return (
    <DrumMachineContainer>
      <InstructionsDrumMachine />
      <LinkContainer>
        <NavLink onClick={handleNavigate} to="/sequencer">
          <StyledButtonImg
            src={sequencerLogo}
            height="60px"
            width="60px"
            alt="sequencer"
          />
        </NavLink>
        <NavLink onClick={handleNavigate} to="/recordings">
          <StyledButtonImg
            src={recordingsLogo}
            height="60px"
            width="60px"
            alt="recordings"
          />
        </NavLink>
        <VolumeButton
          type="button"
          onClick={() => setIsControlsVisible(!isControlsVisible)}
        >
          <StyledButtonImg
            src={volumeLogo}
            height="60px"
            width="60px"
            alt="volume-settings"
          />
        </VolumeButton>
        <NavLink onClick={handleNavigate} to="/settings">
          <StyledButtonImg
            src={settingsLogo}
            height="60px"
            width="60px"
            alt="settings"
          />
        </NavLink>
      </LinkContainer>
      <VolumeControl
        isControlsVisible={isControlsVisible}
        setIsControlsVisible={setIsControlsVisible}
        padVolume={padVolume}
        handlePadVolume={handlePadVolume}
        loopPlayerVolume={loopPlayerVolume}
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
    saveRecording()
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
  }
  function handleNavigate() {
    loopPlayer.stop();
  }
  ////////////////////DrumLoop////////////////////
  function handlePadVolume(e) {
    setPadVolume(e.target.value / 10);
  }

  function handleLoopPlayerVolume(e) {
    setLoopPlayerVolume(e.target.value / 10);
  }
}

const DrumMachineContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr auto auto;
  border: 2px solid var(--lightgray);
  background-color: var(--darkgray);
  position: relative;
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
  padding: 12px;
`;
const StyledButtonImg = styled.img`
  transition: ease 0.2s;
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

const VolumeButton = styled.button`
  background: none;
  border: none;
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
