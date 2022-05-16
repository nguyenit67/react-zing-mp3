import { createSelector } from '@reduxjs/toolkit';

export const selectPlayerQueue = (state) => state.playerQueue;
export const selectRecentSongs = (state) => state.recentSongs;

export const selectPlayerQueueList = createSelector(selectPlayerQueue, (playerQueue) => playerQueue.songList);

export const selectCurrentPlayingSong = createSelector(
  selectPlayerQueue,
  (playerQueue) => playerQueue.songList[playerQueue.currentIndex]
);
