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
import { setChannels, setDefaultChannelid } from '../../stateSlices/channelsSlice.js';
import { setMessages } from '../../stateSlices/messagesSlice.js';
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
      const defaultChannelId = resp.data.channels
        .find(({ name }) => name === 'general').id;
      console.log('defId: ', defaultChannelId);

      dispatch(setChannels(resp.data));
      dispatch(setMessages(resp.data.messages));
      dispatch(setDefaultChannelid({ id: defaultChannelId }));
      setStatus('connected');
    } catch (err) {
      location.pathname = routes.loginPathName();
      history.push(routes.loginPathName());
      setStatus('disconnected');
    }
  }, [history]);

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
