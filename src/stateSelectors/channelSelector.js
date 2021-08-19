import { createSelector } from '@reduxjs/toolkit';

const channelSelector = createSelector(
  (state) => ({
    currentChannelId: state.channels.currentChannelId,
  }),
  ({ currentChannelId }) => currentChannelId,
);

export default channelSelector;
