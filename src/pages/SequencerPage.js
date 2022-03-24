import SequencerPad from '../components/SequencerPad';
import Sequence from '../components/Sequence';
import { defaultSequencerSettings } from '../data';

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as Tone from 'tone';
import { useState, useCallback, useEffect, useMemo } from 'react';

import backLogo from '../images/back.svg';
import playbutton from '../images/play.svg';
import pausebutton from '../images/pause.svg';

export default function SequencerPage({ allPads }) {
  const [selectedPad, setSelectedPad] = useState(0);

  const [allPadSequences, setAllPadSequences] = useState(
    defaultSequencerSettings
  );
  const [selectedPadSequence, setSelectedPadSequence] = useState(
    allPadSequences[selectedPad].settings
  );
  const [isSequencePlaying, setIsSequencePlaying] = useState('stopped');
  const [currentTimeStemp, setCurrentTimeStemp] = useState('');

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
      ).toDestination(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  Tone.Transport.bpm.value = 100;

  useEffect(() => {
    const sequence = new Tone.Sequence(
      function (time, idx) {
        allPlayerSettings.forEach(player => {
          if (player.sequences[idx].isActive) {
            sequencerPlayers.player(`${player.name}`).start();
          }
        });
        // console.log(idx)
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
        <NavLink to="/">
          <StyledButtonImg
            src={backLogo}
            alt="back-button"
            width="45px"
            height="45px"
          />
        </NavLink>
        <Heading>Sequencer</Heading>
      </HeadingContainer>

      <SequencerContainer>
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
      <StartSequenceButton onClick={toggle} type="button">
        <StartSequenceImg
          src={isSequencePlaying === 'stopped' ? playbutton : pausebutton}
          alt=""
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
const HeadingContainer = styled.header`
  display: grid;
  grid-template-columns: 15% 1fr 15%;
`;
const Heading = styled.h2`
  margin-top: 20px;
  text-align: center;
  grid-column: 2 / 3;
`;
const StyledButtonImg = styled.img`
  transition: ease 0.4s;
  border: none;
  border-bottom: 3px solid var(--gray);
  border-right: 3px solid var(--gray);
  border-radius: 100%;
  padding: 5px;

  &:active {
    transition: ease 0.2s;
    border-top: 2px solid var(--gray);
    border-left: 2px solid var(--gray);
  }
`;

const StartSequenceButton = styled.button`
  width: 100px;
  height: 60px;
  background: none;
  border: none;
`;

const StartSequenceImg = styled.img`
  transition: ease 0.4s;
  border: none;
  border-bottom: 3px solid var(--lightgray);
  border-right: 3px solid var(--lightgray);
  border-radius: 100%;
  place-self: center;
  justify-self: center;
  padding: 5px;

  &:active {
    transition: ease 0.2s;
    border-top: 2px solid var(--lightgray);
    border-left: 2px solid var(--lightgray);
  }
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
  display: grid;
  max-width: 410px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
`;
