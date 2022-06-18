import { useState } from 'react';
import styled from 'styled-components';
import backendStore from '../../hooks/backendStore';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { isError, login } = backendStore(state => state);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor="email">
          Email:
          <br />
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
          <br />
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
`;
const FormLabel = styled.label`
  text-align: left;
  margin: 3px;
  width: 50%;
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  border-radius: 5px;
  background: white;
  color: var(--black);

  align-self: center;
  margin: 10px;
  cursor: pointer;
  padding: 10px 20px;
`;
const ErrorMessage = styled.p`
  color: red;
`;
