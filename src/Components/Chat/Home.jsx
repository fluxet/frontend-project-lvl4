/* eslint-disable no-console */
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Context } from '../../context';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import ChatForm from './ChatForm.jsx';
import { setChannels } from './channelsSlice';
import { setMessages } from './messagesSlice';
// import getChannelsInfo from '../../utils';

const Home = () => {
  const dispatch = useDispatch();
  const ctx = useContext(Context);
  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };

  useEffect(() => {
    if (ctx.token !== 'null') {
      axios.get('/api/v1/data', options)
        .then((resp) => {
          console.log('----------------------------home get response: ', resp);
          dispatch(setChannels(resp.data));
          dispatch(setMessages(resp.data.messages));
        })
        .catch((err) => console.log('home get error: ', err));
    }
  });

  return (
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
};

export default Home;
