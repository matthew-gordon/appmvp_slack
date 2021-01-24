import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);

  console.log(auth);

  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? children : <Redirect to="/login" />
      }
    />
  );
};

export default AuthenticatedRoute;
