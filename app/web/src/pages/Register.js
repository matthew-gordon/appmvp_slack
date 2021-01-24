import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { registerUser } from '../actions/auth';

const RegisterForm = ({ registerUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser({ email, password, username }, (success, { user }) => {
      if (success && !!user) {
        history.push(`/client/${user.id}/workspaces`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Username</label>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>Email</label>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>Password</label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>

      <SubmitButton type="submit">Register</SubmitButton>
    </form>
  );
};

const Register = ({ registerUser }) => {
  const auth = useSelector((state) => state.auth);

  if (auth.isLoggedIn) {
    return <Redirect to={`/client/${auth.userInfo.id}/workspaces`} />;
  }

  return (
    <Container>
      <FormContainer>
        {auth.error && <span>{auth.error}</span>}
        <FormHeader>
          <h2>Register for an account</h2>
          <span>
            Have an account? <Link to={'/login'}>Login</Link>
          </span>
        </FormHeader>
        <RegisterForm registerUser={registerUser} />
      </FormContainer>
    </Container>
  );
};

export default connect(null, { registerUser })(Register);

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 2rem;
`;

const FormContainer = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const FormHeader = styled.div`
  margin-bottom: 0.1rem;
`;

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
