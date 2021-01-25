import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { registerUser } from '../actions/auth';
import RegisterForm from '../components/Register/RegisterForm';

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
