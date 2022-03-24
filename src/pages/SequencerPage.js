import SequencerPad from '../components/SequencerPad';
import Sequence from '../components/Sequence';
import { defaultSequencerSettings } from '../data';
import SequencerSettings from '../components/SequencerSettings';

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as Tone from 'tone';
import { useState, useCallback, useEffect, useMemo } from 'react';

import backLogo from '../images/back-right.svg';
import playbutton from '../images/play.svg';
import pausebutton from '../images/pause.svg';
import sequencerSettings from '../images/EQ.svg';

export default function SequencerPage({ allPads }) {
  const [currentBpm, setCurrentBpm] = useState(100);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedPad, setSelectedPad] = useState(0);

  const [allPadSequences, setAllPadSequences] = useState(
    defaultSequencerSettings
  );
  const [selectedPadSequence, setSelectedPadSequence] = useState(
    allPadSequences[selectedPad].settings
  );
  const [isSequencePlaying, setIsSequencePlaying] = useState('stopped');
  const [currentTimeStemp, setCurrentTimeStemp] = useState('');

  // var AudioContext = window.AudioContext || window.webkitAudioContext;

  // // var audioCtx = new AudioContext({
  // //   latencyHint: 'interactive',
  // //   sampleRate: 44100,
  // // });
  const audioCtx = Tone.context;
  const dest = audioCtx.createMediaStreamDestination();

  const allPlayerSettings = useMemo(
    () => [
      { id: '0', name: 'Player0', sequences: allPadSequences['0'].settings },
      { id: '1', name: 'Player1', sequences: allPadSequences['1'].settings },
      { id: '2', name: 'Player2', sequences: allPadSequences['2'].settings },
      { id: '3', name: 'Player3', sequences: allPadSequences['3'].settings },
      { id: '4', name: 'Player4', sequences: allPadSequences['4'].settings },
      { id: '5', name: 'Player5', sequences: allPadSequences['5'].settings },
      { id: '6', name: 'Player6', sequences: allPadSequences['6'].settings },
      { id: '7', name: 'Player7', sequences: allPadSequences['7'].settings },
      { id: '8', name: 'Player8', sequences: allPadSequences['8'].settings },
      { id: '9', name: 'Player9', sequences: allPadSequences['9'].settings },
      { id: '10', name: 'Player10', sequences: allPadSequences['10'].settings },
      { id: '11', name: 'Player11', sequences: allPadSequences['11'].settings },
    ],
    [allPadSequences]
  );

  const sequencerPlayers = useMemo(
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
          volume: 0,
        }
      ).toDestination(dest.stream),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  Tone.Transport.bpm.value = currentBpm;

  useEffect(() => {
    const sequence = new Tone.Sequence(
      function (time, idx) {
        allPlayerSettings.forEach(player => {
          if (player.sequences[idx].isActive) {
            sequencerPlayers.player(`${player.name}`).start();
          }
        });
        setCurrentTimeStemp(idx);
      },
      [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      '16n'
    ).start(0);
    return () => sequence.dispose();
  }, [allPlayerSettings, sequencerPlayers]);

  const toggle = useCallback(() => {
    Tone.Transport.toggle();
    setIsSequencePlaying(Tone.Transport.state);
  }, []);

  return (
    <>
      <HeadingContainer>
        <SettingsButton
          aria-label="show settings"
          type="button"
          onClick={() => setIsSettingsVisible(!isSettingsVisible)}
        >
          <StyledButtonImg
            src={sequencerSettings}
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
        {selectedPadSequence.map(sequence => (
          <Sequence
            key={sequence.id}
            value={sequence.value}
            isActive={sequence.isActive}
            color={allPads[selectedPad].color}
            updateSequenceClick={updateSequenceClick}
            currentTimeStemp={currentTimeStemp}
          />
        ))}
      </SequencerContainer>
      <PadList>
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
    </>
  );

  function sequencerPadClick(event) {
    const currentPad = event.target.value;
    setSelectedPadSequence(allPadSequences[currentPad].settings);
    setSelectedPad(currentPad);
    Tone.loaded().then(() => {
      sequencerPlayers.player(`Player${currentPad}`).start();
    });
  }
  function updateSequenceClick(event) {
    ////////////////    selectedPadSequence     /////////////////////
    const oldSequence = event.target.value;
    const isActive = selectedPadSequence[oldSequence].isActive;
    const newSequence = {
      id: oldSequence,
      name: `sequence${oldSequence}`,
      value: Number(oldSequence),
      isActive: !isActive,
    };
    const notRemovedSequences = selectedPadSequence.filter(
      sequence => sequence.id !== newSequence.id
    );
    const sortedPadSequence = [...notRemovedSequences, newSequence];
    sortedPadSequence.sort(function (a, b) {
      return a.id - b.id;
    });
    setSelectedPadSequence(sortedPadSequence);
    //////////////    selectedPadSequence    ///////////////

    //////////////    allPadSequences    ///////////////
    const newPadSequence = {
      id: selectedPad.toString(),
      settings: sortedPadSequence,
    };

    const notRemovedPadSequences = allPadSequences.filter(
      sequence => sequence.id !== selectedPad.toString()
    );

    const sortedAllPadSequences = [...notRemovedPadSequences, newPadSequence];

    sortedAllPadSequences.sort(function (a, b) {
      return a.id - b.id;
    });

    setAllPadSequences(sortedAllPadSequences);
    //////////////    allPadSequences    ///////////////
  }
}

const SettingsButton = styled.button`
  background: none;
  border: none;
`;

const HeadingContainer = styled.header`
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
  width: 100px;
  height: 60px;
  background: none;
  border: none;
`;

const SequencerContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  max-width: 410px;
  grid-gap: 2px;
  margin: 10px;
`;

const PadList = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
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
