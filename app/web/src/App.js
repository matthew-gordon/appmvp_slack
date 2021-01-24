import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Workspace from './pages/Workspace';
import Workspaces from './pages/Workspaces';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { authSuccess } from './actions/auth';

const Loading = () => {
  return <h1>Loading...</h1>;
};

const UnAuthenticatedRoutes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <AuthenticatedRoute path="/client/:userId/workspaces/:id">
            <Workspace />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/client/:userId/workspaces">
            <Workspaces />
          </AuthenticatedRoute>
          <UnAuthenticatedRoutes />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
