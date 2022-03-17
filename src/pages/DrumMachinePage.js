import DrumLoopPlayer from '../components/DrumLoopPlayer';
import DrumPad from '../components/DrumPad';
import Recorder from '../components/Recorder';

import { NavLink } from 'react-router-dom';
import * as Tone from 'tone';
import styled from 'styled-components';
import { useState, useRef } from 'react';

import settingsButton from '../images/settings.svg';
import playbutton from '../images/play.svg';
import pausebutton from '../images/pause.svg';

export default function DrumMachinePage({ allPads }) {
  const [currentDrumLoop, setCurrentDrumLoop] = useState();
  const [isPlayin, setIsPlayin] = useState(playbutton);
  const [recordingSrc, setRecordingSrc] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  console.log(isRecording, 'beim state');

  ///////////////LoopPlayer///////////////
  const loopPlayer = useRef();
  loopPlayer.current = new Tone.Player(
    `./audio/DrumLoops/${currentDrumLoop}.wav`
  ).toDestination();
  loopPlayer.current.loop = true;
  ///////////////LoopPlayer///////////////

  ///////////////DrumPadPlayers///////////////
  const drumPadPlayers = useRef();
  drumPadPlayers.current = new Tone.Players({
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
  }).toDestination();
  ///////////////DrumPadPlayers///////////////

  ///////////////Recorder///////////////
  const actx = useRef();
  actx.current = Tone.context;
  const dest = useRef();
  dest.current = actx.current.createMediaStreamDestination();
  const recorder = useRef();
  recorder.current = new MediaRecorder(dest.current.stream);

  drumPadPlayers.current.connect(dest.current);

  const chunks = useRef();
  chunks.current = [];

  recorder.current.ondataavailable = event => chunks.current.push(event.data);
  recorder.current.onstop = event => {
    let blob = new Blob(chunks.current, { type: 'audio/mp3; codecs=opus' });
    let audio = URL.createObjectURL(blob);
    setRecordingSrc(audio);
  };
  ///////////////Recorder//////////////

  return (
    <DrumMachineContainer>
      <LinkButton onClick={handleNavigate} to="/settings">
        <img src={settingsButton} height="50px" width="50px" alt="settings" />
      </LinkButton>
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
      <Recorder
        recordStopClick={recordStopClick}
        recordClick={recordClick}
        recordingSrc={recordingSrc}
      />

      <DrumLoopPlayer
        startDrumLoop={startDrumLoop}
        getDrumLoop={getDrumLoop}
        isPlayin={isPlayin}
      />
    </DrumMachineContainer>
  );

  ////////////////////record////////////////////
  function recordStopClick() {
    recorder.current.stop();
  }

  function recordClick() {
    console.log(isRecording);
    isRecording ? recorder.current.stop() : recorder.current.start();
    setIsRecording(!isRecording);
  }
  ////////////////////record////////////////////

  ////////////////////drumPad////////////////////
  function drumPadClick(event) {
    const currentPlayer = event.target.value;
    Tone.loaded().then(() => {
      drumPadPlayers.current.player(`Player${currentPlayer}`).start();
    });
  }
  ////////////////////drumPad////////////////////

  ////////////////////DrumLoop////////////////////
  function startDrumLoop() {
    if (isPlayin === playbutton) {
      Tone.loaded().then(() => {
        loopPlayer.current.start();
      });
      setIsPlayin(pausebutton);
    } else {
      loopPlayer.current.stop();
      setIsPlayin(playbutton);
    }
  }
  function getDrumLoop(event) {
    setCurrentDrumLoop(event.target.value);
    loopPlayer.current.stop();
    setIsPlayin(playbutton);
  }
  function handleNavigate() {
    loopPlayer.current.stop();
  }
}
////////////////////DrumLoop////////////////////

const DrumMachineContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr auto;
  border: 2px solid var(--gray);
  background-color: var(--darkgray);

  @media (max-width: 1000px) {
    @media (orientation: landscape) {
      display: none;
    }
  }
`;

const LinkButton = styled(NavLink)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: end;
  padding-top: 15px;
  padding-right: 15px;
`;
const PadList = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  max-width: 450px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  margin: 10px;
`;
