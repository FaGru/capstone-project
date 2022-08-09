import { useState } from 'react';
import styled from 'styled-components';
import backendStore from '../../hooks/backendStore';

export default function MidiSettings() {
  const { userMidiData, userData, setMidiData } = backendStore(state => state);

  const [configPopUpVisible, setConfigPopUpVisible] = useState(false);
  const [newConfigName, setNewConfigName] = useState('');

  console.log(newConfigName);

  return (
    <UserSettingsContainer>
      {userData ? (
        <>
          {configPopUpVisible && (
            <>
              <NewConfigForm>
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
          <button onClick={() => setConfigPopUpVisible(!configPopUpVisible)}>
            save current config
          </button>
          <ul>
            {userMidiData.map(data => (
              <MidiListElement key={data._id}>
                <div>{data.text}</div>
                <LoadMidiButton>load</LoadMidiButton>
                <DeleteMidiButton>delete</DeleteMidiButton>
              </MidiListElement>
            ))}
          </ul>
        </>
      ) : (
        <p>Please login to load or save your MIDI-Settings</p>
      )}
    </UserSettingsContainer>
  );

  function saveNewConfig() {
    setMidiData(newConfigName);
    setConfigPopUpVisible(false);
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  padding: 20px;
  align-items: center;
  background-color: var(--darkgray);
  box-shadow: inset 0 0 20px 1px var(--black);
  border: 2px solid var(--lightgray);
  border-radius: 10px;
`;
const FormLabel = styled.label`
  color: var(--white);
  font-size: 0.9rem;
  text-align: center;
  margin: 3px;
  display: flex;
  flex-direction: column;
  input {
    margin: 5px;
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
