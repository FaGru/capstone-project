import SequencerPad from '../components/SequencerPad/SequencerPad';
import Sequencer from '../components/Sequencer/Sequencer';
import SequencerSettings from '../components/SequencerSettings/SequencerSettings';
import InstructionsSequencer from '../components/Instructions/InstructionsSequencer';
import NavAnimation from '../components/FramerMotion';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import {
  StyledButtonImg,
  InvisibleButton,
  StartSequenceButton,
} from '../components/Buttons';

import styled from 'styled-components';
import * as Tone from 'tone';
import { useState, useCallback } from 'react';
import useStore from '../hooks/useStore';

import playbutton from '../images/play.svg';
import pausebutton from '../images/pause.svg';
import EQLogo from '../images/EQ.svg';

export default function SequencerPage() {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isSequencePlaying, setIsSequencePlaying] = useState('stopped');

  const {
    selectedSequencerPad,
    allPadSequences,
    allPads,
    sequencerPlayers,
    setSelectedSequencerPad,
    setSelectedPadSequence,
  } = useStore(state => state);


  const toggle = useCallback(() => {
    Tone.Transport.toggle();
    setIsSequencePlaying(Tone.Transport.state);
  }, []);

  return (
    <NavAnimation start="initialLeft" end="outLeft">
      <PageContainer>
        <GridContainer>
          <SequencerContainer>
            <SequencerSettings
              isSettingsVisible={isSettingsVisible}
              setIsSettingsVisible={setIsSettingsVisible}
            />
            <Sequencer color={allPads[selectedSequencerPad].color} />
          </SequencerContainer>
          <PadList>
            <InstructionsSequencer />
            {allPads.map(pad => (
              <SequencerPad
                key={pad.id}
                id={pad.id}
                color={pad.color}
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
          <InvisibleButton
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
          </InvisibleButton>
        </GridContainer>
      </PageContainer>
    </NavAnimation>
  );

  function sequencerPadClick(event) {
    const currentPad = event.target.value;
    setSelectedPadSequence(allPadSequences[currentPad].settings);
    setSelectedSequencerPad(currentPad);
    Tone.loaded().then(() => {
      sequencerPlayers.player(`Player${currentPad}`).start();
    });
  }
}

const PageContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 1fr auto 1fr;
  margin: 20px;
`;

const GridContainer = styled(BackgroundAnimation)`
  position: relative;
  grid-column: 2 / 3;
  background-color: var(--darkgray);
  border: 1px solid var(--darkgray);
  padding: 10px;
  margin-top: 25px;
  border-radius: 10px;
  box-shadow: inset 0 0 15px 2px var(--black);
`;

const SequencerContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 2px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const PadList = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5px;
  margin-bottom: 15px;

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
