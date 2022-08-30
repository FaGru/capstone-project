import { useState } from 'react';
import styled from 'styled-components';
import backendStore from '../../hooks/backendStore';
import useStore from '../../hooks/useStore';
import close from '../../images/close.svg';

export default function MidiSettings() {
  const { userMidiData, userData, setMidiData, deleteMidiData } = backendStore(
    state => state
  );
  const { setAssignedMIDIControls } = useStore(state => state);

  const [configPopUpVisible, setConfigPopUpVisible] = useState(false);
  const [newConfigName, setNewConfigName] = useState('');
  const [confirmPopUpVisible, setConfirmPopUpVisible] = useState(false);
  const [selectedMidiData, setSelectedMidiData] = useState(null);
  console.log(userMidiData, 'backenddata');

  return (
    <UserSettingsContainer>
      {userData ? (
        <>
          <SaveMidiButton
            onClick={() => setConfigPopUpVisible(!configPopUpVisible)}
          >
            save current config
          </SaveMidiButton>
          <ul>
            {userMidiData.map(data => (
              <MidiListElement key={data._id}>
                <div>{data.text}</div>
                <LoadMidiButton
                  onClick={() => setAssignedMIDIControls(data.midiData)}
                >
                  load
                </LoadMidiButton>
                <DeleteMidiButton value={data._id} onClick={handleDelete}>
                  delete
                </DeleteMidiButton>
              </MidiListElement>
            ))}
          </ul>
        </>
      ) : (
        <p>Please login to load or save your MIDI-Settings</p>
      )}
      {configPopUpVisible && (
        <>
          <NewConfigForm>
            <CloseButton
              type="button"
              aria-label="close"
              onClick={() => setConfigPopUpVisible(!configPopUpVisible)}
            >
              <img src={close} height="15px" width="15px" alt="close" />
            </CloseButton>
            <FormLabel>
              Please add a name for your new MIDI-Config!
              <input
                name="config-name"
                type="text"
                placeholder="new config-name"
                required
                value={newConfigName}
                onChange={e => setNewConfigName(e.target.value)}
              />
            </FormLabel>
            <SubmitButton
              type="button"
              disabled={newConfigName.length === 0 ? true : false}
              onClick={saveNewConfig}
            >
              save
            </SubmitButton>
          </NewConfigForm>
        </>
      )}
      {confirmPopUpVisible && (
        <ConfirmPopUp>
          <p>Do you really want delete this MIDI-Config?</p>
          <SubmitButton onClick={handleConfirm}>confirm</SubmitButton>
          <CancelButton onClick={() => setConfirmPopUpVisible(false)}>
            cancel
          </CancelButton>
        </ConfirmPopUp>
      )}
    </UserSettingsContainer>
  );

  function saveNewConfig() {
    setMidiData(newConfigName);
    setConfigPopUpVisible(false);
  }
  function handleDelete(e) {
    setSelectedMidiData(e.target.value);
    setConfirmPopUpVisible(true);
  }
  function handleConfirm() {
    deleteMidiData(selectedMidiData);
    setConfirmPopUpVisible(false);
  }
}

const UserSettingsContainer = styled.section`
  position: relative;
  text-align: center;
  min-height: 500px;

  p {
    margin: 20px;
  }

  ul {
    list-style: none;
    padding: 0;

    li:first-child {
      border-top: 1px solid var(--white);
    }
  }
`;
const MidiListElement = styled.li`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr auto;
  padding: 5px;
  border-bottom: 1px solid var(--white);
  font-size: 0.9rem;
`;

const LoadMidiButton = styled.button`
  color: var(--green);
  margin-right: 10px;
  background-color: var(--black);
  border-radius: 5px;
  border: 1px solid var(--green);
  box-shadow: 1px 1px 5px 0.5px var(--green);
  letter-spacing: 1px;
  cursor: pointer;
`;
const DeleteMidiButton = styled(LoadMidiButton)`
  color: var(--red);
  border: 1px solid var(--red);
  box-shadow: 1px 1px 5px 0.5px var(--red);
`;

const NewConfigForm = styled.form`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  padding: 20px;
  align-items: center;
  background-color: var(--darkgray);
  box-shadow: inset 0 0 20px 1px var(--black);
  border: 2px solid var(--lightgray);
  border-radius: 10px;
  transition: ease 0.5s;
  animation: bounce 0.5s alternate;

  @keyframes bounce {
    0% {
      transform: translate(-50%, -600px);
    }
    40% {
      transform: translate(-50%, 30px);
    }
    100% {
      transform: translate(-50%);
    }
  }
`;
const FormLabel = styled.label`
  color: var(--white);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  input {
    margin: 10px;
    border: 1px solid var(--green);
    box-shadow: 0px 0px 5px 1px var(--green);
    border-radius: 5px;
    height: 30px;
    background: var(--lightgray);
    color: var(--white);
    ::placeholder {
      color: var(--black);
    }
  }
`;

const SubmitButton = styled(LoadMidiButton)`
  margin: 10px;
  color: ${props => (props.disabled ? 'var(--gray)' : 'var(--green)')};
  border: 1px solid
    ${props => (props.disabled ? 'var(--gray)' : 'var(--green)')};
  box-shadow: 1px 1px 5px 0.5px
    ${props => (props.disabled ? 'var(--gray)' : 'var(--green)')};
  padding: 8px 15px;
`;
const SaveMidiButton = styled(LoadMidiButton)`
  margin: 10px;
  color: ${props => (props.disabled ? 'var(--gray)' : 'gold')};
  border: 1px solid ${props => (props.disabled ? 'var(--gray)' : 'gold')};
  box-shadow: 1px 1px 5px 0.5px
    ${props => (props.disabled ? 'var(--gray)' : 'gold')};
  padding: 5px 10px;
`;
const CloseButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  top: 8px;
  right: 3px;
  cursor: pointer;
`;
const ConfirmPopUp = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  padding: 15px;
  align-items: center;
  background-color: var(--darkgray);
  box-shadow: inset 0 0 20px 1px var(--black);
  border: 2px solid var(--lightgray);
  border-radius: 10px;
  transition: ease 0.5s;
  animation: bounce 0.3s alternate;

  @keyframes bounce {
    0% {
      transform: translate(-50%) scale(0);
    }
    70% {
      transform: translate(-50%) scale(1.1);
    }
    100% {
      transform: translate(-50%) scale(1);
    }
  }
`;

const CancelButton = styled(DeleteMidiButton)`
  padding: 8px 15px;
`;
