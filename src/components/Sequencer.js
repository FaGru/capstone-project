import styled from 'styled-components';
import useStore from '../hooks/useStore';
import * as Tone from 'tone';
import { useEffect } from 'react';

export default function Sequencer({ color, currentBpm }) {
  const currentTimeStamp = useStore(state => state.currentTimeStamp);
  const getAllPadSequences = useStore(state => state.getAllPadSequences);
  const allPadSequences = useStore(state => state.allPadSequences);
  const getCurrentTimeStamp = useStore(state => state.getCurrentTimeStamp);
  const selectedPadSequence = useStore(state => state.selectedPadSequence);
  const sequencerPlayers = useStore(state => state.drumPadPlayers);
  const getSelectedPadSequence = useStore(
    state => state.getSelectedPadSequence
  );
  const selectedSequencerPad = useStore(state => state.selectedSequencerPad);

  Tone.Transport.bpm.value = currentBpm;

  useEffect(() => {
    const sequence = new Tone.Sequence(
      function (time, idx) {
        allPadSequences.forEach(sequence => {
          if (sequence.settings[idx].isActive) {
            sequencerPlayers.player(`Player${sequence.id}`).start();
          }
        });
        getCurrentTimeStamp(idx);
      },
      [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      '16n'
    ).start(0);
    return () => sequence.dispose();
  }, [allPadSequences, sequencerPlayers]);

  return (
    <>
      {selectedPadSequence.map(sequence => (
        <SequencerButton
          type="button"
          data-testid="sequencer-button"
          aria-label="sequencer-button"
          onClick={updateSequenceClick}
          color={color}
          key={sequence.id}
          value={sequence.value}
          isActive={sequence.isActive}
          currentTimeStemp={currentTimeStamp}
        ></SequencerButton>
      ))}
    </>
  );
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
    getSelectedPadSequence(sortedPadSequence);
    //////////////    selectedPadSequence    ///////////////

    //////////////    allPadSequences    ///////////////
    const newPadSequence = {
      id: selectedSequencerPad.toString(),
      settings: sortedPadSequence,
    };

    const notRemovedPadSequences = allPadSequences.filter(
      sequence => sequence.id !== selectedSequencerPad.toString()
    );

    const sortedAllPadSequences = [...notRemovedPadSequences, newPadSequence];

    sortedAllPadSequences.sort(function (a, b) {
      return a.id - b.id;
    });

    getAllPadSequences(sortedAllPadSequences);
    //////////////    allPadSequences    ///////////////
  }
}

const SequencerButton = styled.button`
  background: none;
  background-color: ${props =>
    props.isActive ? 'var(--' + props.color + ')' : 'none'};
  border: 2px solid
    ${props =>
      props.currentTimeStemp === props.value ? 'var(--orange)' : 'var(--gray)'};
  box-shadow: ${props =>
    props.currentTimeStemp === props.value
      ? '0px 0px 5px 3px var(--green-active)'
      : 'none'};
  border-radius: 5px;
  width: 50px;
  height: 50px;

  @media (max-width: 500px) {
    width: 11vw;
    height: 11vw;
  }
`;
