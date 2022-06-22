import { useState } from 'react';
import styled from 'styled-components';
import backendStore from '../../hooks/backendStore';
import useStore from '../../hooks/useStore';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { isError, login } = backendStore(state => state);
  const { setLoginRegister } = useStore(state => state);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor="email">
          E-Mail:
          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
          />
        </FormLabel>
        <FormLabel htmlFor="password">
          Password:
          <input
            onChange={handleChange}
            type="password"
            value={formData.password}
            name="password"
            placeholder="Enter your password"
            required
          />
        </FormLabel>
        <SubmitButton type="submit">login</SubmitButton>
        {isError && <ErrorMessage>{isError}</ErrorMessage>}
        <Paragraph>
          Don&apos;t have an account? <br />
          <span onClick={() => setLoginRegister('register')}>
            click here to register!
          </span>
        </Paragraph>
      </Form>
    </>
  );
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    login(formData);
  }
}
const Form = styled.form`
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
  color: var(--green);
  background-color: var(--black);
  border-radius: 5px;
  border: 1px solid var(--green);
  box-shadow: 1px 1px 5px 0.5px var(--green);
  letter-spacing: 1px;
  cursor: pointer;
`;
const ErrorMessage = styled.p`
  color: red;
`;
const Paragraph = styled.p`
  margin: 0px;
  span {
    color: var(--green);
    cursor: pointer;
  }
`;
