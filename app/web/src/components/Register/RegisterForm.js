import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

const RegisterForm = ({ registerUser }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: ({ email, username, password }) => {
      registerUser({ email, password, username }, (success, { user }) => {
        if (success && !!user) {
          history.push(`/client/${user.id}/workspaces`);
        }
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <label>Username</label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Email</label>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </FormGroup>
      <SubmitButton type="submit">Register</SubmitButton>
    </Form>
  );
};

export default RegisterForm;

const Form = styled.form``;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 75px;
  margin-bottom: 0.1rem;
`;

const Input = styled.input`
  color: #1a202c;
  width: 100%;
  border: solid 1px #e2e8f0;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(
    135deg,
    rgba(0, 97, 215, 1) 0%,
    rgba(0, 200, 255, 1) 100%
  );
  padding: 0.5rem 1.5rem;
  color: #fff;
  border: none;
  border-radius: 100px;
  cursor: pointer;
`;
