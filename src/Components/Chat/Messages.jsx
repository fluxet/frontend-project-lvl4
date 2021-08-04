import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Element as ScrollProvider, animateScroll as scroll } from 'react-scroll';

const Messages = () => {
  const data = useSelector((state) => state.messages.value);
  const channelId = useSelector((state) => state.channels.value.currentChannelId);
  const messages = data.filter((message) => message.data.attributes.channelId === channelId);
  const idName = 'messages-box';

  useEffect(() => {
    scroll.scrollToBottom({ containerId: idName });
    console.log('scroll.scrollTobottom: ', scroll.scrollToBottom);
  }, [messages]);

  return (
    <ScrollProvider className="d-flex flex-column h-100">
      <div id={idName} className="chat-messages mb-3 overflow-auto">
        {messages && messages.map(({ data: { attributes: { message, username } }, id }) => (
          <div key={id} className="text-break">
            <b>{username}</b>
            :
            {' '}
            {message}
          </div>
        ))}
      </div>
    </ScrollProvider>
  );
};

export default Messages;
