import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {import('@/types').Song} Song
 */

/**
 * @typedef {Song[]} RecentSongsSliceState
 */

const recentSongsSlice = createSlice({
  name: 'recentSongs',
  /** @type {RecentSongsSliceState} */
  initialState: [],
  reducers: {
    /**
     * @param {Song[]} state */
    addRecentSong(state, action) {
      const newSong = action.payload;
      const index = state.findIndex((song) => song.encodeId === newSong.encodeId);
      if (index === -1) {
        state.splice(index, 1);
      }
      state.unshift(newSong);
    },
  },
});

const { reducer: recentSongsReducer } = recentSongsSlice;
export const { addRecentSong } = recentSongsSlice.actions;
export default recentSongsReducer;
