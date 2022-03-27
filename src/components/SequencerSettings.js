import styled from 'styled-components';
import useStore from '../hooks/useStore';
import close from '../images/close.svg';

export default function SequencerSettings({
  isSettingsVisible,
  setIsSettingsVisible,
}) {
  const getCurrentBpm = useStore(state => state.getCurrentBpm);
  const currentBpm = useStore(state => state.currentBpm);

  return (
    <>
      {isSettingsVisible ? (
        <SettingsContainer>
          <CloseButton
            aria-label="close"
            type="button"
            onClick={() => setIsSettingsVisible(!isSettingsVisible)}
          >
            <img src={close} height="20px" width="20px" alt="close" />
          </CloseButton>
          <label htmlFor="Sequencer-BPM">BPM {currentBpm}</label>
          <input
            data-testid="Sequencer-BPM"
            name="Sequencer-BPM"
            id="Sequencer-BPM"
            type="range"
            min="0"
            max="160"
            defaultValue={currentBpm}
            onChange={event => getCurrentBpm(event.target.value)}
          ></input>
        </SettingsContainer>
      ) : (
        ''
      )}
    </>
  );
}
const SettingsContainer = styled.section`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 5px solid var(--darkgray);
  border-radius: 10px;
  width: 300px;
  background-color: var(--gray);
  place-self: center;
  padding: 10px;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  place-self: end;
`;
