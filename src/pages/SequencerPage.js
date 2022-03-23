import SequencerPad from '../components/SequencerPad';
import Sequence from '../components/Sequence';
import { defaultSequencerSettings } from '../data';

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as Tone from 'tone';

import backLogo from '../images/back.svg';
import { useState, useMemo } from 'react';
// function intialize(length = 32) {
//   return Array.from({ length }, (_, index) => ({
//     id: index,
//     active: index % 3 === 0,
//   }));
// }
export default function SequencerPage({ allPads }) {
  const [selectedPad, setSelectedPad] = useState(0);

  const [allPadSequences, setAllPadSequences] = useState(
    defaultSequencerSettings
  );
  const [selectedPadSequence, setSelectedPadSequence] = useState(
    allPadSequences[selectedPad].settings
  );
  const [seqPlaying, setSeqPlaying] = useState(false);
  console.log(seqPlaying);

  const allPlayerSettings = [
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
  ];

  const sequencerPlayers = new Tone.Players(
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
  ).toDestination();

  Tone.Transport.bpm.value = 100;

  const sequence = useMemo(
    () =>
      new Tone.Sequence(
        function (time, idx) {
          allPlayerSettings.forEach(player => {
            if (player.sequences[idx].isActive) {
              sequencerPlayers.player(`${player.name}`).start();
            }
          });
        },
        [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        '8n'
      ),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allPlayerSettings]
  );

  return (
    <>
      <BackButton to="/">
        <img src={backLogo} alt="back-button" width="35px" height="35px" />
      </BackButton>
      <SequencerContainer>
        {selectedPadSequence.map(sequence => (
          <Sequence
            key={sequence.id}
            value={sequence.value}
            isActive={sequence.isActive}
            color={allPads[selectedPad].color}
            updateSequenceClick={updateSequenceClick}
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
      <Button onClick={startSequence}>start sequence</Button>
    </>
  );

  function startSequence(event) {
    setSeqPlaying(!seqPlaying);
    if (seqPlaying === true) {
      sequence.stop();
    } else {
      Tone.Transport.start('+0.2');
      sequence.start();
    }
  }

  function sequencerPadClick(e) {
    const currentPad = e.target.value;
    setSelectedPadSequence(allPadSequences[currentPad].settings);
    setSelectedPad(currentPad);
    Tone.loaded().then(() => {
      sequencerPlayers.player(`Player${currentPad}`).start();
    });
  }
  function updateSequenceClick(e) {
    ////////////////    selectedPadSequence     /////////////////////
    const oldSequence = e.target.value;
    const isActive = selectedPadSequence[oldSequence].isActive;
    const newSequence = {
      id: oldSequence,
      name: `sequence${oldSequence}`,
      value: oldSequence,
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
      // eslint-disable-next-line eqeqeq
      sequence => sequence.id != selectedPad
    );

    const sortedAllPadSequences = [...notRemovedPadSequences, newPadSequence];

    sortedAllPadSequences.sort(function (a, b) {
      return a.id - b.id;
    });

    setAllPadSequences(sortedAllPadSequences);
    //////////////    allPadSequences    ///////////////
  }
}

const Button = styled.button`
  width: 100px;
  height: 60px;
`;

const BackButton = styled(NavLink)`
  margin: 15px;
  justify-self: start;
  grid-column: 1 / 2;
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
