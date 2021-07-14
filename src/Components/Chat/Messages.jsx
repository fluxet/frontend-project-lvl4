import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const data = useSelector((state) => state.messages.value);
  const channelId = useSelector((state) => state.channels.value.currentChannelId);
  const messages = data.filter((message) => message.data.attributes.channelId === channelId);

  const lastMessageEl = useRef(null);

  useEffect(() => {
    lastMessageEl.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages && messages.map(({ data: { attributes: { message, username } }, id }) => <div key={id} className="text-break"><b>{username}</b>: {message}</div>)}
      <div ref={lastMessageEl}></div>
    </div>
  );
};

export default Messages;
