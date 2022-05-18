import { createSelector } from '@reduxjs/toolkit';
import { LOOP_MODE } from './playerQueueSlice';

export const selectPlayer = (state) => state.playerQueue;
export const selectRecentSongs = (state) => state.recentSongs;

export const selectPlayerQueueList = createSelector(selectPlayer, (playerQueue) => playerQueue.songList);

export const selectCurrentPlayingSong = createSelector(
  selectPlayer,
  (playerQueue) => playerQueue.songList[playerQueue.currentIndex]
);

export const selectIsAppPlaying = createSelector(selectPlayer, (player) => player.isAppPlaying);
export const selectPlayingIndex = createSelector(selectPlayer, (player) => player.currentIndex);

export const selectRepeatMode = createSelector(selectPlayer, (player) => player.loopMode);
export const selectIsShuffle = createSelector(selectPlayer, (player) => player.isShuffle);

export const selectHasSongNext = createSelector(
  selectPlayer,
  (playerQueue) =>
    playerQueue.currentIndex < playerQueue.songList.length - 1 || playerQueue.loopMode !== LOOP_MODE.NO_LOOP
);
