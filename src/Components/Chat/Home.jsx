import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ContextAuth } from '../../context';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import ChatForm from './ChatForm.jsx';
import Modal from './Modals/index.jsx';
import { setChannels } from '../../stateSlices/channelsSlice.js';
import { setMessages } from '../../stateSlices/messagesSlice.js';
import routes from '../../routes.js';
import debug from '../../../lib/logger.js';

const log = debug('Home');
log.enabled = true;

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userRequestOptions } = useContext(ContextAuth);
  const [status, setStatus] = useState('disconnected');

  useEffect(async () => {
    try {
      const resp = await axios.get(routes.dataPath(), userRequestOptions);
      dispatch(setChannels(resp.data));
      dispatch(setMessages(resp.data.messages));
      setStatus('connected');
    } catch (e) {
      const statusCode = e.response.status;
      if (statusCode === 401) {
        history.push(routes.loginPathName());
      }
      log(e);
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

      <Modal />
    </Container>
  );

  const vdomWaiting = <div>{t('loading')}</div>;

  return (status === 'connected') ? vdomResponseSuccess : vdomWaiting;
};

export default Home;
