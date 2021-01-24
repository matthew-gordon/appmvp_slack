import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { loginUser } from '../actions/auth';

const LoginPage = ({ loginUser }) => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser({ email, password }, (success) => {
      if (success) {
        history.push('/workspaces');
      }
    });
  };

  return (
    <div>
      {auth.error && <span>{auth.error}</span>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default connect(null, { loginUser })(LoginPage);
