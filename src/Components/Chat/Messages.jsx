import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

const Messages = () => {
  const data = useSelector((state) => state.messages.value);
  const channelId = useSelector((state) => state.channels.value.currentChannelId);
  const messages = data.filter((message) => message.data.attributes.channelId === channelId);

  console.log('messages channelId: ', channelId);
  console.log('data: ', data);
  console.log('Messages : ', messages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages && messages.map(({ data: { attributes: { message, username } } }) => <div key={_.uniqueId()} className="text-break"><b>{username}</b>: {message}</div>)}
    </div>
  );
};

export default Messages;
