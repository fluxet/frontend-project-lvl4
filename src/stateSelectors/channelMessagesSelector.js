import { createSelector } from '@reduxjs/toolkit';

const channelMessagesSelector = createSelector(
  (state) => ({
    messages: state.messages,
    currentChannelId: state.channels.currentChannelId,
  }),
  ({ messages, currentChannelId }) => messages
    .filter((message) => message.data.attributes.channelId === currentChannelId),
);

export default channelMessagesSelector;
