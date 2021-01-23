import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Team from './pages/Team';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Loading = () => {
  return <h1>Loading...</h1>;
};

const UnAuthenticatedRoutes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
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

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/team/:id">
            <Team />
          </Route>
          <UnAuthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
