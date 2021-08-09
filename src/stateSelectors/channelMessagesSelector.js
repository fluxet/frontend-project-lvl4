import { createSelector } from '@reduxjs/toolkit';

const channelMessagesSelector = createSelector(
  (state) => state,
  (messages) => {
    console.log('messages: ', messages);
    return messages;
  },
);

export default channelMessagesSelector;
