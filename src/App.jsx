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
import Authorization from './Authorization.jsx';
import Home from './Components/Chat/Home.jsx';
import Signup from './Signup.jsx';
import { Context } from './context';

const ContextProvider = (props) => {
  const { children, wsClient } = props;
  const [localToken, setLocalToken] = useState('null');
  const [localUsername, setLocalUsername] = useState('null');
  const writeToken = (token) => setLocalToken(token); // ?
  const writeUsername = (username) => setLocalUsername(username); // ?
  const [wasChatFormMount, setWasChatFormMount] = useState(false);

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
      wasChatFormMount,
      setWasChatFormMount,
      wsClient,
    }}>
      {children}
    </Context.Provider>
  );
};

const ChatRoute = ({ path }) => {
  const ctx = useContext(Context);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    ctx.writeToken(token);
    ctx.writeUsername(username);
  }, []);

  return (
    <Route path={path}
      render={() => ((token === 'null') ? <Redirect to="/login" /> : <Home />)}
    />
  );
};

const App = ({ wsClient }) => {
  const onExitClick = () => {
    localStorage.clear();
  };

  return (
    <ContextProvider wsClient={wsClient}>
      <Router>
        <div className="d-flex flex-column">
          <Navbar>
            <Link className="mr-auto navbar-brand" to="/">Hexlet Chat</Link>
            <Nav>
              <Button variant="primary" as={Link} to="/login" onClick={onExitClick}>Выход</Button>
            </Nav>
          </Navbar>
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
    </ContextProvider>
  );
};

export default App;
