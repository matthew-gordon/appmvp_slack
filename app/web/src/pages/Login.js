import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { loginUser } from '../actions/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser({ email, password }, (success, { user }) => {
      if (success && !!user) {
        history.push(`/client/${user.id}/workspaces`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Email</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <label>Password</label>
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

const LoginPage = ({ loginUser }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Container>
      <FormContainer>
        {auth.error && <span>{auth.error}</span>}
        <LoginForm loginUser={loginUser} />
      </FormContainer>
    </Container>
  );
};

export default connect(null, { loginUser })(LoginPage);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const FormContainer = styled.div`
  padding: 12px;
`;
