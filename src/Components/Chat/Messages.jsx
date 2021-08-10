import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Element as ScrollProvider, animateScroll as scroll } from 'react-scroll';
import channelMessageSelector from '../../stateSelectors/channelMessagesSelector.js';

const Messages = () => {
  const containerId = 'container-messages';
  const messages = useSelector(channelMessageSelector);

  useEffect(() => {
    scroll.scrollToBottom({ containerId });
  }, [messages]);

  return (
    <ScrollProvider id={containerId} className="d-flex flex-column h-100 overflow-auto">
      <div id="'messages-box'" className="chat-messages mb-3">
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
