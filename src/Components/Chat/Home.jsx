/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Context from '../../context';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import ChatForm from './ChatForm.jsx';
import { setChannels } from './channelsSlice';
import { setMessages } from './messagesSlice';
import routes from '../../routes.js';

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const ctx = useContext(Context);
  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };
  const [status, setStatus] = useState('disconnected');

  useEffect(async () => {
    try {
      const resp = await axios.get(routes.dataPath(), options);
      console.log('----------------------------home get response: ', resp);
      dispatch(setChannels(resp.data));
      dispatch(setMessages(resp.data.messages));
      setStatus('connected');
    } catch (err) {
      console.log('home get error: ', err);
      location.pathname = routes.loginPathName();
      history.push(routes.loginPathName());
      setStatus('disconnected');
    }
  }, [status]);

  const vdomResponseSuccess = (
    <Container className="overflow-hidden my-4 h-100 rounded shadow">
      <Row className="flex-md-row h-100">
        <Channels />
        <Col className="p-3 h-100 d-flex flex-column">
          <Messages />
          <ChatForm />
        </Col>
      </Row>
    </Container>
  );

  const vdomWaiting = <div>...Loading</div>;

  return (status === 'connected') ? vdomResponseSuccess : vdomWaiting;
};

export default Home;
