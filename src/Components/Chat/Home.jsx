/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Context } from '../../context';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import ChatForm from './ChatForm.jsx';
import { setChannels } from './channelsSlice';
import { setMessages } from './messagesSlice';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ctx = useContext(Context);
  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };
  const [status, setStatus] = useState('disconnected');

  useEffect(async () => {
    const resp = await axios.get('/api/v1/data', options);
    try {
      console.log('----------------------------home get response: ', resp);
      dispatch(setChannels(resp.data));
      dispatch(setMessages(resp.data.messages));
      setStatus('connected');
    } catch (err) {
      console.log('home get error: ', err);
      history.replace({ pathname: '/' });
    }
  });

  const vdomResponseSuccess = (
    <div className="row flex-grow-1 h-75 pb-3">
      <Channels />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <ChatForm />
        </div>
      </div>
    </div>
  );

  const vdomWaiting = <div>...Loading</div>;

  return (status === 'connected') ? vdomResponseSuccess : vdomWaiting;
};

export default Home;
