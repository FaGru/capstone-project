import SequencerPad from '../components/SequencerPad';
import Sequencer from '../components/Sequencer';
import SequencerSettings from '../components/SequencerSettings';
import InstructionsSequencer from '../components/InstructionsSequencer';

import {
  StyledButtonImg,
  InvisibleButton,
  StartSequenceButton,
} from '../components/Buttons';

import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as Tone from 'tone';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

import backLogo from '../images/back-right.svg';
import playbutton from '../images/play.svg';
import pausebutton from '../images/pause.svg';
import EQLogo from '../images/EQ.svg';
import useStore from '../hooks/useStore';
import settingsLogo from '../images/settings.svg';

export default function SequencerPage() {
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
      <GridContainer>
        <HeadingContainer
          animate={{ scale: [0.2, 1] }}
          transition={{ duration: 0.5 }}
        >
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
          <NavLink to="/settings">
            <StyledButtonImg
              src={settingsLogo}
              height="50px"
              width="50px"
              alt="settings"
            />
          </NavLink>
          <NavLink aria-label="back" to="/drum-machine">
            <StyledButtonImg
              src={backLogo}
              alt="back-button"
              width="50px"
              height="50px"
            />
          </NavLink>
        </HeadingContainer>
        <SequencerContainer
          animate={{ scale: [0.2, 1] }}
          transition={{ duration: 0.5 }}
        >
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
              sample={pad.sample}
              sequencerPadClick={sequencerPadClick}
            />
          ))}
        </PadList>
        <StartSequenceButton
          as={motion.button}
          animate={{ scale: [0.2, 1] }}
          transition={{ duration: 0.5 }}
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
      </GridContainer>
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
const animation = keyframes`
0% {background-position: top center;}
100% {background-position: bottom center;}
`;
const PageContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 1fr auto 1fr;
  justify-content: center;
  align-items: center;

  &::before,
  ::after {
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    place-content: center;

    position: absolute;
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
const GridContainer = styled.div`
  grid-column: 2 / 3;
  background-color: var(--darkgray);
  border: 2px solid var(--lightgray);
  padding: 5px;
  margin-top: 30px;
  margin-bottom: auto;
  border-radius: 10px;
`;

const HeadingContainer = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const SequencerContainer = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 2px;
  margin-bottom: 10px;
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
