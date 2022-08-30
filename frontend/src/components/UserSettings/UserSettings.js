import backendStore from '../../hooks/backendStore';
import styled from 'styled-components';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import useStore from '../../hooks/useStore';

export default function UserSettings() {
  const { userData, logOut } = backendStore(state => state);
  const { loginRegister } = useStore(state => state);

  return (
    <UserSettingsContainer>
      {userData && (
        <>
          <p>Hello {userData.name}!</p>
          <LogoutButton onClick={logOut}>LOGOUT</LogoutButton>
        </>
      )}
      {!userData && loginRegister === 'login' && <LoginForm />}
      {!userData && loginRegister === 'register' && <RegisterForm />}
    </UserSettingsContainer>
  );
}

const UserSettingsContainer = styled.section`
  text-align: center;
  min-height: 500px;

  p {
    margin: 20px;
  }
`;
const LogoutButton = styled.button`
  align-self: center;
  margin: 10px;
  padding: 8px 15px;
  color: var(--green);
  background-color: var(--black);
  border-radius: 5px;
  border: 1px solid var(--green);
  box-shadow: 1px 1px 5px 0.5px var(--green);
  letter-spacing: 1px;
  cursor: pointer;
`;
