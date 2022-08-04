import styled from 'styled-components';
import backendStore from '../../hooks/backendStore';
import useStore from '../../hooks/useStore';

export default function MidiSettings() {
  const { userMidiData, userData } = backendStore(state => state);
  const { loginRegister } = useStore(state => state);

  return (
    <UserSettingsContainer>
      {userData ? (
        <>
          <p>Load or save your Midi-Settings</p>
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
}

const UserSettingsContainer = styled.section`
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
