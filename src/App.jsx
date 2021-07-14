/* eslint-disable no-console */

import React, {
  useState, useContext, useEffect,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import initTranslation from './initTranslation.js';

import Authorization from './Authorization.jsx';
import Home from './Components/Chat/Home.jsx';
import Signup from './Signup.jsx';
import { Context } from './context';
import routes from './routes.js';

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || 'null');
  const [username, setUsername] = useState(localStorage.getItem('username') || 'null');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  return (
    <Context.Provider value={{
      token,
      username,
      setToken,
      setUsername,
    }}>
      {children}
    </Context.Provider>
  );
};

const ChatRoute = ({ path }) => {
  const ctx = useContext(Context);
  console.log('context: ', ctx);
  const { token } = ctx;

  return (
    <Route path={path}
      render={() => ((token === 'null') ? <Redirect to="/login" /> : <Home />)}
    />
  );
};

const App = () => {
  initTranslation();

  const onExitClick = () => {
    localStorage.clear();
  };

  return (
    <ContextProvider>
      <Router>
        <div className="d-flex flex-column">
          <Navbar>
            <Link className="mr-auto navbar-brand" to="/">Hexlet Chat</Link>
            <Nav>
              <Button variant="primary" as={Link} to={routes.loginPathName()} onClick={onExitClick}>Выход</Button>
            </Nav>
          </Navbar>
        </div>
        <Switch>
          <Route path={routes.loginPathName()}>
            <Authorization />
          </Route>
          <Route path={routes.signupPathName()}>
            <Signup />
          </Route>
          <ChatRoute path ="/">
          </ChatRoute>
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;
