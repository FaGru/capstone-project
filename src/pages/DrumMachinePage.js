import DrumLoopPlayer from '../components/DrumLoopPlayer/DrumLoopPlayer';
import DrumPad from '../components/DrumPad/DrumPad';
import RecordButton from '../components/RecordButton/RecordButton';
import VolumeControl from '../components/VolumeControl/VolumeControl';
import InstructionsDrumMachine from '../components/Instructions/InstructionsDrumMachine';
import NavAnimation from '../components/FramerMotion';
import { BackgroundAnimation } from '../components/BackgroundAnimation';

import { StyledButtonImg, InvisibleButton } from '../components/Buttons';

import styled from 'styled-components';
import * as Tone from 'tone';
import { useState } from 'react';
import useStore from '../hooks/useStore';

import volumeLogo from '../images/EQ.svg';

export default function DrumMachinePage() {
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const {
    recorder,
    loopPlayer,
    allPads,
    isMIDIAssignButtonActive,
    initLoopPlayer,
    saveRecording,
    setCurrentDrumLoop,
    setLoopPlayerVolume,
    setDrumPadPlayersVolume,
    setIsMIDIAssignButtonActive,
  } = useStore(state => state);

  return (
    <div>
      <NavAnimation start={'initialTop'} end={'initialTop'}>
        <DrumMachineContainer>
          <InstructionsDrumMachine />
          <LinkContainer>
            <MIDIButton
              isActive={isMIDIAssignButtonActive}
              onClick={setIsMIDIAssignButtonActive}
            >
              Assign <br />
              MIDI-Control
            </MIDIButton>

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
    </div>
  );

  ////////////////////drumPad////////////////////
  function drumPadClick(playerNumber) {
    const { drumPadPlayers } = useStore.getState();
    Tone.loaded().then(() => {
      drumPadPlayers.player(`Player${playerNumber}`).start();
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

  @media (max-width: 1100px) {
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
const MIDIButton = styled.button`
  align-self: center;
  justify-self: center;
  background-color: ${props =>
    props.isActive ? 'var(--blue-active)' : 'var(--blue)'};
  height: 40px;
  width: 100px;
  border-radius: 5px;
  box-shadow: ${props =>
    props.isActive === true
      ? '0 0 20px 2px var(--blue)'
      : 'inset 0 0 10px 2px var(--blue-active)'};
`;
