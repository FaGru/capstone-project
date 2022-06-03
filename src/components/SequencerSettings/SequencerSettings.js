import styled from 'styled-components';
import useStore from '../../hooks/useStore';
import close from '../../images/close.svg';
import { motion } from 'framer-motion';

export default function SequencerSettings({
  isSettingsVisible,
  setIsSettingsVisible,
}) {
  const setcurrentSequencerBpm = useStore(
    state => state.setcurrentSequencerBpm
  );
  const currentSequencerBpm = useStore(state => state.currentSequencerBpm);
  const setDrumPadPlayersVolume = useStore(
    state => state.setDrumPadPlayersVolume
  );
  const drumPadPlayersVolume = useStore(state => state.drumPadPlayersVolume);

  return (
    <>
      {isSettingsVisible && (
        <SettingsContainer
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <CloseButton
            aria-label="close"
            type="button"
            onClick={() => setIsSettingsVisible(!isSettingsVisible)}
          >
            <img src={close} height="20px" width="20px" alt="close" />
          </CloseButton>
          <label htmlFor="Sequencer-BPM">BPM {currentSequencerBpm}</label>
          <Input
            data-testid="Sequencer-BPM"
            name="Sequencer-BPM"
            id="Sequencer-BPM"
            type="range"
            min="0"
            max="160"
            defaultValue={currentSequencerBpm}
            onChange={event => setcurrentSequencerBpm(event.target.value)}
          ></Input>
          <label htmlFor="Sequencer-Volume">
            Volume {(Number(drumPadPlayersVolume) + 30) / 5}
          </label>
          <Input
            data-testid="Sequencer-Volume"
            name="Sequencer-Volume"
            id="Sequencer-Volume"
            type="range"
            min="-60"
            max="20"
            defaultValue={drumPadPlayersVolume}
            onChange={event => setDrumPadPlayersVolume(event.target.value / 2)}
          ></Input>
        </SettingsContainer>
      )}
    </>
  );
}
const SettingsContainer = styled(motion.section)`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 2px solid var(--lightgray);
  border-radius: 10px;
  width: 300px;
  background-color: var(--darkgray);
  place-self: center;
  padding: 10px;
  box-shadow: inset 0 0 20px 1px var(--black);
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  place-self: end;
  cursor: pointer;
`;
const Input = styled.input`
  cursor: pointer;
`;
