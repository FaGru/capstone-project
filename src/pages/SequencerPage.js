import SequencerPad from '../components/SequencerPad';
import Sequencer from '../components/Sequencer';
import SequencerSettings from '../components/SequencerSettings';
import InstructionsSequencer from '../components/InstructionsSequencer';

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as Tone from 'tone';
import { useState, useCallback } from 'react';

import backLogo from '../images/back-right.svg';
import playbutton from '../images/play.svg';
import pausebutton from '../images/pause.svg';
import EQLogo from '../images/EQ.svg';
import useStore from '../hooks/useStore';

export default function SequencerPage() {
  const [currentBpm, setCurrentBpm] = useState(100);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const [isSequencePlaying, setIsSequencePlaying] = useState('stopped');

  const selectedSequencerPad = useStore(state => state.selectedSequencerPad);
  const getSelectedSequencerPad = useStore(
    state => state.getSelectedSequencerPad
  );
  const allPadSequences = useStore(state => state.allPadSequences);

  const allPads = useStore(state => state.allPads);
  const sequencerPlayers = useStore(state => state.drumPadPlayers);

  const getSelectedPadSequence = useStore(
    state => state.getSelectedPadSequence
  );

  const toggle = useCallback(() => {
    Tone.Transport.toggle();
    setIsSequencePlaying(Tone.Transport.state);
  }, []);

  return (
    <PageContainer>
      <HeadingContainer>
        <SettingsButton
          aria-label="show settings"
          type="button"
          onClick={() => setIsSettingsVisible(!isSettingsVisible)}
        >
          <StyledButtonImg
            src={EQLogo}
            height="50px"
            width="50px"
            alt="volume-settings"
          />
        </SettingsButton>
        <Heading>Sequencer</Heading>
        <NavLink aria-label="back" to="/">
          <StyledButtonImg
            src={backLogo}
            alt="back-button"
            width="50px"
            height="50px"
          />
        </NavLink>
      </HeadingContainer>
      <SequencerContainer>
        <SequencerSettings
          isSettingsVisible={isSettingsVisible}
          currentBpm={currentBpm}
          setCurrentBpm={setCurrentBpm}
          setIsSettingsVisible={setIsSettingsVisible}
        />
        <Sequencer
          color={allPads[selectedSequencerPad].color}
          currentBpm={currentBpm}
        />
      </SequencerContainer>
      <PadList>
        <InstructionsSequencer />
        {allPads.map(pad => (
          <SequencerPad
            key={pad.id}
            id={pad.id}
            color={pad.color}
            sample={pad.sample}
            sequencerPadClick={sequencerPadClick}
          />
        ))}
      </PadList>
      <StartSequenceButton
        aria-label="start-stop sequencer"
        onClick={toggle}
        type="button"
      >
        <StyledButtonImg
          src={isSequencePlaying === 'stopped' ? playbutton : pausebutton}
          alt="play-pause"
          width="50px"
          height="50px"
        />
      </StartSequenceButton>
    </PageContainer>
  );

  function sequencerPadClick(event) {
    const currentPad = event.target.value;
    getSelectedPadSequence(allPadSequences[currentPad].settings);
    getSelectedSequencerPad(currentPad);
    Tone.loaded().then(() => {
      sequencerPlayers.player(`Player${currentPad}`).start();
    });
  }

}
const PageContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 1fr auto 1fr;
  justify-content: center;
  align-items: center;
  background-color: var(--black);
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
`;

const HeadingContainer = styled.header`
  grid-column: 2 / 3;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Heading = styled.h2`
  text-align: center;
  padding: 5px;
  background-color: var(--darkgray);
  border-top: 4px solid var(--lightgray);
  border-bottom: 4px solid var(--lightgray);
  border-radius: 10px;
`;

const StyledButtonImg = styled.img`
  transition: ease 0.4s;
  border: 1px solid var(--gray);
  border-bottom: 4px solid var(--gray);
  border-right: 4px solid var(--gray);
  border-radius: 100%;
  padding: 3px;

  &:active {
    transition: ease 0.2s;
    border-top: 4px solid var(--gray);
    border-left: 4px solid var(--gray);
  }
`;

const StartSequenceButton = styled.button`
  grid-column: 2 / 3;
  width: 100px;
  height: 60px;
  background: none;
  border: none;
`;

const SequencerContainer = styled.section`
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  max-width: 410px;
  grid-gap: 2px;
  margin: 10px;
`;

const PadList = styled.section`
  grid-column: 2 / 3;
  max-width: 410px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;

  button:nth-child(3n + 3) {
    grid-row: 1 / 2;
  }
  button:nth-child(3n + 2) {
    grid-row: 2 / 3;
  }
  button:nth-child(3n + 1) {
    grid-row: 3 / 4;
  }
`;
