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

  const authorizeUser = (response) => {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    setUser({
      token: response.data.token,
      name: response.data.username,
    });
  };

  const onExit = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const userRequestOptions = { headers: { Authorization: `Bearer ${user.token}` } };

  return (
    <ContextAuth.Provider value={{
      token: user.token,
      username: user.name,
      authorizeUser,
      userRequestOptions,
      onExit,
    }}
    >
      {children}
    </ContextAuth.Provider>
  );
};

const ChatRoute = ({ path }) => {
  const { token } = useContext(ContextAuth);

  return (
    <Route
      path={path}
      render={() => ((!token) ? <Redirect to="/login" /> : <Home />)}
    />
  );
};

const ExitButton = () => {
  const { t } = useTranslation();
  const { onExit } = useContext(ContextAuth);
  const location = useLocation();
  const isOnHomePage = location.pathname === '/';

  return isOnHomePage && <Button variant="primary" as={Link} to={routes.loginPathName()} onClick={onExit}>{t('nav.exit')}</Button>;
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
