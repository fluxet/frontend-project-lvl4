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
} from 'react-router-dom';
import {
  Button, Navbar, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Authorization from './Components/Authorization.jsx';
import Home from './Components/Chat/Home.jsx';
import Signup from './Components/Signup.jsx';
import Context from './context';
import routes from './routes.js';

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || 'null');
  const [username, setUsername] = useState(localStorage.getItem('username') || 'null');

  return (
    <Context.Provider value={{
      token,
      username,
      setToken,
      setUsername,
    }}
    >
      {children}
    </Context.Provider>
  );
};

const ChatRoute = ({ path }) => {
  const ctx = useContext(Context);
  const { token } = ctx;

  return (
    <Route
      path={path}
      render={() => ((token === 'null') ? <Redirect to="/login" /> : <Home />)}
    />
  );
};

const App = () => {
  const { t } = useTranslation();

  const onExitClick = () => {
    localStorage.clear();
  };

  return (
    <div className="h-100 d-flex flex-column">
      <ContextProvider>
        <Router>
          <Navbar>
            <Link className="mr-auto navbar-brand" to="/">Hexlet Chat</Link>
            <Nav>
              <Button variant="primary" as={Link} to={routes.loginPathName()} onClick={onExitClick}>{t('nav.exit')}</Button>
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
      </ContextProvider>
    </div>
  );
};

export default App;
