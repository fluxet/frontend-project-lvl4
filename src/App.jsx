/* eslint-disable no-console */

import React, {
  useState, useContext,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import {
  Button, Navbar, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Authorization from './Components/Authorization.jsx';
import Home from './Components/Chat/Home.jsx';
import Signup from './Components/Signup.jsx';
import { ContextAuth } from './context';
import routes from './routes.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem('token'),
    name: localStorage.getItem('username'),
  });

  return (
    <ContextAuth.Provider value={{
      token: user.token,
      username: user.name,
      setUser,
    }}
    >
      {children}
    </ContextAuth.Provider>
  );
};

const ChatRoute = ({ path }) => {
  const ctx = useContext(ContextAuth);
  const { token } = ctx;

  return (
    <Route
      path={path}
      render={() => ((!token) ? <Redirect to="/login" /> : <Home />)}
    />
  );
};

const ExitButton = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';

  const onExitClick = () => {
    localStorage.clear();
  };

  return isOnHomePage && <Button variant="primary" as={Link} to={routes.loginPathName()} onClick={onExitClick}>{t('nav.exit')}</Button>;
};

const App = () => (
  <div className="h-100 d-flex flex-column">
    <AuthProvider>
      <Router>
        <Navbar>
          <Link className="mr-auto navbar-brand" to="/">Hexlet Chat</Link>
          <Nav>
            <ExitButton />
          </Nav>
        </Navbar>
        <Switch>
          <Route path={routes.loginPathName()}>
            <Authorization />
          </Route>
          <Route path={routes.signupPathName()}>
            <Signup />
          </Route>
          <ChatRoute path="/" />
        </Switch>
      </Router>
    </AuthProvider>
  </div>
);

export default App;
