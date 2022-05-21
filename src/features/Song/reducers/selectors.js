import { createSelector } from '@reduxjs/toolkit';
import { LOOP_MODE } from './playerQueueSlice';

export const selectPlayer = (state) => state.playerQueue;

export const selectPlayerQueueList = createSelector(selectPlayer, (player) => player.songList);
export const selectRecentSongList = createSelector(selectPlayer, (player) => player.recentSongs);

export const selectCurrentPlayingSong = createSelector(selectPlayer, (player) => player.songList[player.currentIndex]);

export const selectIsAppPlaying = createSelector(selectPlayer, (player) => player.isAppPlaying);
export const selectPlayingIndex = createSelector(selectPlayer, (player) => player.currentIndex);

export const selectRepeatMode = createSelector(selectPlayer, (player) => player.loopMode);
export const selectIsShuffle = createSelector(selectPlayer, (player) => player.isShuffle);

// export const selectNextSong = createSelector(selectPlayer, (player) => {
//   const hasNext = player.currentIndex < player.songList.length - 1 || player.loopMode !== LOOP_MODE.NO_LOOP;
//   return hasNext ? player.songList[player.currentIndex] : undefined;
// });
