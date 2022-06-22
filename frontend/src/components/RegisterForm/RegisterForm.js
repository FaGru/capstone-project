import { useState } from 'react';
import styled from 'styled-components';
import backendStore from '../../hooks/backendStore';
import useStore from '../../hooks/useStore';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const { isError, register } = backendStore(state => state);
  const { setLoginRegister } = useStore(state => state);

  return (
    <>
      <RegistrationForm onSubmit={handleSubmit}>
        <FormLabel>
          Username:
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </FormLabel>
        <FormLabel>
          E-Mail:
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </FormLabel>
        <FormLabel>
          Password:
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Enter password"
            required
            onChange={handleChange}
          />
        </FormLabel>
        <FormLabel>
          Confirm Password:
          <input
            name="password_confirm"
            type="password"
            value={formData.password_confirm}
            placeholder="Confirm password"
            required
            onChange={handleChange}
          />
        </FormLabel>
        <SubmitButton
          type="submit"
          disabled={
            formData.password === formData.password_confirm &&
            formData.password !== ''
              ? false
              : true
          }
        >
          register
        </SubmitButton>
        {isError && <ErrorMessage>{isError}</ErrorMessage>}
        <Paragraph>
          Have already an account? <br />
          <span onClick={() => setLoginRegister('login')}>
            click here to login!
          </span>
        </Paragraph>
      </RegistrationForm>
    </>
  );

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  }
}

const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: center;
  gap: 5px;
`;
const FormLabel = styled.label`
  color: var(--white);
  font-size: 0.9rem;
  text-align: left;
  margin: 3px;

  display: flex;
  flex-direction: column;
  input {
    margin-top: 2px;
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

const SubmitButton = styled.button`
  align-self: center;
  margin-top: 20px;
  padding: 8px 15px;
  color: ${props => (props.disabled ? 'var(--gray)' : 'var(--green)')};
  background-color: var(--black);
  border-radius: 5px;
  border: 1px solid
    ${props => (props.disabled ? 'var(--gray)' : 'var(--green)')};
  box-shadow: 1px 1px 5px 0.5px
    ${props => (props.disabled ? 'var(--gray)' : 'var(--green)')};
  letter-spacing: 1px;
  cursor: pointer;
`;
const ErrorMessage = styled.p`
  color: red;
`;
const Paragraph = styled.p`
  span {
    color: var(--green);
    cursor: pointer;
  }
`;
