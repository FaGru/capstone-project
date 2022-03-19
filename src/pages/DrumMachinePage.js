import DrumLoopPlayer from '../components/DrumLoopPlayer';
import DrumPad from '../components/DrumPad';
import RecordButton from '../components/RecordButton';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import * as Tone from 'tone';
import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';

import settingsButton from '../images/settings.svg';
import recordingsPageButton from '../images/record-page-wave.svg';

export default function DrumMachinePage({
  allPads,
  setMyRecordings,
  myRecordings,
}) {
  const [currentDrumLoop, setCurrentDrumLoop] = useState('DrumLoop90BPM');
  const [devicesState, setDevicesState] = useState('');

  ///////////////Recorder///////////////
  const actx = Tone.context;
  const dest = actx.createMediaStreamDestination();
  const recorder = useRef(null);
  recorder.current = new MediaRecorder(dest.stream);
  const chunks = [];

  recorder.current.ondataavailable = event => chunks.push(event.data);
  recorder.current.onstop = () => {
    let blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
    let audio = URL.createObjectURL(blob);
    const newRecording = {
      id: nanoid(),
      audio: audio,
    };
    setDevicesState('stop');
    setMyRecordings([newRecording, ...myRecordings]);
  };
  ///////////////Recorder/////////////

  ///////////////LoopPlayer///////////////
  const loopPlayer = useRef();
  loopPlayer.current = new Tone.Player(
    `./audio/DrumLoops/${currentDrumLoop}.wav`
  ).toDestination();
  loopPlayer.current.loop = true;
  ///////////////LoopPlayer///////////////

  ///////////////DrumPadPlayers///////////////
  const drumPadPlayers = new Tone.Players(
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
      volume: -5,
    }
  ).toDestination();
  ///////////////DrumPadPlayers///////////////
  drumPadPlayers.connect(dest);
  loopPlayer.current.connect(dest);

  return (
    <DrumMachineContainer>
      <RecordingsLinkButton onClick={handleNavigate} to="/recordings">
        <img
          src={recordingsPageButton}
          height="40px"
          width="40px"
          alt="recordings"
        />
      </RecordingsLinkButton>
      <SettingsLinkButton onClick={handleNavigate} to="/settings">
        <img src={settingsButton} height="40px" width="40px" alt="settings" />
      </SettingsLinkButton>
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
      <DrumLoopPlayer
        startDrumLoop={startDrumLoop}
        getDrumLoop={getDrumLoop}
        recordStopClick={recordStopClick}
        recorder={recorder}
        devicesState={devicesState}
        setDevicesState={setDevicesState}
      />
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
    recorder.current.start();
  }

  function recordStopClick() {
    recorder.current.stop();
    loopPlayer.current.stop();
  }
  ////////////////////record////////////////////

  ////////////////////DrumLoop////////////////////
  function startDrumLoop(isPlayin) {
    if (isPlayin === false) {
      Tone.loaded().then(() => {
        loopPlayer.current.start();
      });
    } else {
      loopPlayer.current.stop();
    }
  }
  function getDrumLoop(isPlayin, currentLoop) {
    if (recorder.current.state === 'inactive') {
      loopPlayer.current.stop();
      setCurrentDrumLoop(currentLoop);
    } else {
      recordStopClick();
      setCurrentDrumLoop(currentLoop);
    }
  }
  function handleNavigate() {
    loopPlayer.current.stop();
  }
}
////////////////////DrumLoop////////////////////

const DrumMachineContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr auto auto;
  border: 2px solid var(--lightgray);
  background-color: var(--darkgray);

  @media (max-width: 1000px) {
    @media (orientation: landscape) {
      display: none;
    }
  }
`;

const SettingsLinkButton = styled(NavLink)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: end;
  padding: 12px;
`;

const RecordingsLinkButton = styled(NavLink)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: start;
  padding: 12px;
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
