import styled from 'styled-components';
import close from '../images/close.svg';

export default function SequencerSettings({
  isSettingsVisible,
  currentBpm,
  setCurrentBpm,
  setIsSettingsVisible,
}) {
  return (
    <>
      {isSettingsVisible ? (
        <SettingsContainer>
          <CloseButton aria-label='close' type='button' onClick={() => setIsSettingsVisible(!isSettingsVisible)}>
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
            value={currentBpm}
            onChange={event => setCurrentBpm(event.target.value)}
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
