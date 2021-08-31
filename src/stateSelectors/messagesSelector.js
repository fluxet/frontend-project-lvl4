import { createSelector } from '@reduxjs/toolkit';

const messagesSelector = createSelector(
  (state) => ({
    messages: state.messages,
    currentChannelId: state.channels.currentChannelId,
  }),
  ({ messages, currentChannelId }) => messages
    .filter((message) => message.data.attributes.channelId === currentChannelId),
);

export default messagesSelector;
