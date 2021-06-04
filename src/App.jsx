/* eslint-disable no-console */

import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import Authorization from './Authorization.jsx';
import NotFound from './NotFound.jsx';
import Home from './Components/Chat/Home.jsx';
import Signup from './Signup.jsx';
import initTranslation from './initTranslation';
import { Context } from './context';

const AuthProvider = (props) => {
  const { children } = props;
  const [localToken, setLocalToken] = useState('null');
  const [localUsername, setLocalUsername] = useState('null');

  const writeToken = (token) => setLocalToken(token); // ?
  const writeUsername = (username) => setLocalUsername(username); // ?

  if (!localToken) {
    setLocalToken('null');
    localStorage.setItem('token', 'null');
  }

  return (
    <Context.Provider value={{
      token: localToken,
      username: localUsername,
      writeToken,
      writeUsername,
    }}>
      {children}
    </Context.Provider>
  );
};

const ChatRoute = ({ children, path }) => {
  const ctx = useContext(Context);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    ctx.writeToken(token);
    ctx.writeUsername(username);
  }, []);

  return (
    <Route path={path}
      render={() => {
        return (token === 'null') ? <Redirect to="/login" /> : <Home />;
      }}
    />
  );
};

const App = () => {
  initTranslation();

  return (
    <AuthProvider>
      <Router>
          <div className="d-flex flex-column">
            <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
              <Link className="mr-auto navbar-brand" to="/">Hexlet Chat</Link>
            </nav>
          </div>
          <Switch>
            <Route path="/login">
              <Authorization />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <ChatRoute path ="/">
            </ChatRoute>
          </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
