import StorageKeys from '@/constants/storage-keys';
import { randomIntBetween } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {import('@/types').Song} Song
 */

export const LOOP_MODE = {
  NO_LOOP: 'no-loop',
  LOOP_ONE: 'loop-one',
  LOOP_ALL: 'loop-all',
};

const NEXT_LOOP_MODE = {
  [LOOP_MODE.NO_LOOP]: LOOP_MODE.LOOP_ALL,
  [LOOP_MODE.LOOP_ALL]: LOOP_MODE.LOOP_ONE,
  [LOOP_MODE.LOOP_ONE]: LOOP_MODE.NO_LOOP,
};

/**
 * @typedef {typeof LOOP_MODE} LOOPMODE_TYPE
 */

/**
 * @typedef {{
 *  songList: Song[],
 *  stackPlayedIndexes: number[],
 *  currentIndex: number,
 *  isAppPlaying: boolean,
 *  isLoadingAudio: boolean,
 *  volume: number,
 *  isShuffle: boolean,
 *  loopMode: LOOPMODE_TYPE[keyof LOOPMODE_TYPE],
 * }} PlayerQueueSliceState
 */

const playerQueueSlice = createSlice({
  name: 'playerQueue',
  /** @type {PlayerQueueSliceState} */
  initialState: {
    songList: [],
    stackPlayedIndexes: [],
    currentIndex: 0,
    isAppPlaying: false,
    isLoadingAudio: false,
    volume: JSON.parse(localStorage.getItem(StorageKeys.VOLUME)) || 0.5,
    loopMode: LOOP_MODE.NO_LOOP,
    isShuffle: false,
  },
  reducers: {
    playNext(state) {
      let nextIndex;
      if (state.isShuffle && state.currentIndex + 1 < state.songList.length) {
        nextIndex = randomIntBetween(state.currentIndex + 1, state.songList.length);
      } else {
        nextIndex = state.currentIndex + 1;
      }

      if (nextIndex >= state.songList.length && state.loopMode === LOOP_MODE.LOOP_ALL) {
        nextIndex = 0;
      }

      state.currentIndex = nextIndex;
      state.stackPlayedIndexes.push(nextIndex);
      state.isAppPlaying = true;
    },

    playPrevious(state) {
      let previousIndex;

      if (state.loopMode === LOOP_MODE.LOOP_ONE) {
        state.isAppPlaying = true;
      } // loop itself
      else if (state.isShuffle) {
        previousIndex = state.stackPlayedIndexes.pop();
        if (previousIndex !== undefined) {
          state.currentIndex = previousIndex;
        }
      } else {
        previousIndex = state.currentIndex - 1;
        if (previousIndex < 0 && state.loopMode === LOOP_MODE.LOOP_ALL) {
          previousIndex = state.songList.length - 1;
        }

        if (previousIndex >= 0) {
          state.currentIndex = previousIndex;
          state.isAppPlaying = true;
        }
      }
    },

    /** @param {PlayerQueueSliceState} state */
    playSong(state, action) {
      const newSong = action.payload;
      const existedIndex = state.songList.findIndex((oldSong) => oldSong.encodeId === newSong.encodeId);
      let nextIndex;

      if (existedIndex !== -1) {
        nextIndex = existedIndex;
      } else {
        state.songList.push(newSong);
        nextIndex = state.songList.length - 1;
      }
      state.currentIndex = nextIndex;
      state.stackPlayedIndexes.push(nextIndex);
      state.isAppPlaying = true;
    },

    setSongs(state, action) {
      const songs = action.payload;
      state.songList = songs;
      state.stackPlayedIndexes = [];
    },

    setAppPlaying(state, action) {
      state.isAppPlaying = action.payload;
    },

    setShuffle(state, action) {
      state.isShuffle = action.payload;
    },

    setIsLoadingAudio(state, action) {
      state.isLoadingAudio = action.payload;
    },

    setVolume(state, action) {
      const newVolume = action.payload;
      state.volume = newVolume;
      localStorage.setItem(StorageKeys.VOLUME, JSON.stringify(newVolume));
    },

    setLoopMode(state, action) {
      state.loopMode = action.payload;
    },

    cycleLoopMode(state) {
      state.loopMode = NEXT_LOOP_MODE[state.loopMode];
    },
  },
});

const { actions: playerQueueActions, reducer: playerQueueReducer } = playerQueueSlice;
export const {
  playNext,
  playPrevious,
  playSong,
  setSongs,
  setAppPlaying,
  setVolume,
  cycleLoopMode,
  setLoopMode,
  setShuffle,
} = playerQueueActions;
export default playerQueueReducer;
