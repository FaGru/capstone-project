import backendStore from '../../hooks/backendStore';
import styled from 'styled-components';
import LoginForm from '../LoginForm/LoginForm';


export default function UserSettings() {
  const { userData } = backendStore(state => state);

  return (
    <UserSettingsContainer>
      {userData ? (
        <p>Hello {userData.name}!</p>
      ) : (
        <LoginForm />
      )}

    </UserSettingsContainer>
  );
}

const UserSettingsContainer = styled.section`
  text-align: center;
`;
