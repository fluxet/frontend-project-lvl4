import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Element as ScrollProvider, animateScroll as scroll } from 'react-scroll';

const Messages = () => {
  const data = useSelector((state) => state.messages.value);
  const channelId = useSelector((state) => state.channels.value.currentChannelId);
  const messages = data.filter((message) => message.data.attributes.channelId === channelId);

  useEffect(() => {
    scroll.scrollToBottom();
  }, [messages]);

  return (
    <ScrollProvider>
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {messages && messages.map(({ data: { attributes: { message, username } }, id }) => <div key={id} className="text-break"><b>{username}</b>: {message}</div>)}
      </div>
    </ScrollProvider>
  );
};

export default Messages;
