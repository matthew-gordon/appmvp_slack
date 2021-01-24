import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={() => (auth.isLoggedIn ? children : <Redirect to="/login" />)}
    />
  );
};

export default AuthenticatedRoute;
