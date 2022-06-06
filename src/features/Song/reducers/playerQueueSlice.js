import songApi from '@/api/songApi';
import StorageKeys from '@/constants/storage-keys';
import { randomIntBetween } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Bounce, Flip, Slide, toast, Zoom } from 'react-toastify';

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
 * @typedef {import('@/types').Song} Song
 * @typedef {{
 *  songList: Song[];
 *  recentSongs: Song[];
 *  stackPlayedIndexes: number[];
 *  currentIndex: number;
 *  isAppPlaying: boolean;
 *  isFetchingStreamUrl: boolean;
 *  streamUrl: string;
 *  isShuffle: boolean;
 *  loopMode: string;
 * }} PlayerQueueSliceState
 */

/** @type {import('@reduxjs/toolkit').AsyncThunk<any, Song, any>} */

export const playSong = createAsyncThunk('playerQueue/playSong', async (song) => {
  const loadingToastId = toast.loading('Đang tải bài hát...');
  const resp = await songApi.getMp3(song.encodeId);

  const streamUrl = resp?.data?.['128'] ?? '';

  // @ts-ignore
  if (resp.err !== 0 || streamUrl.length === 0) {
    toast.update(loadingToastId, {
      render: 'Không tải được bài hát, vui lòng thử lại sau!',
      type: toast.TYPE.ERROR,
      isLoading: false,
      transition: Flip,
      autoClose: 2250,
      hideProgressBar: true,
    });
    // @ts-ignore
    throw new Error(`Tải bài hát thất bại: ${resp?.msg}`);
  }

  toast.dismiss(loadingToastId);
  return { song, streamUrl };
});

const playerQueueSlice = createSlice({
  name: 'playerQueue',
  /** @type {PlayerQueueSliceState} */
  initialState: {
    songList: [],
    stackPlayedIndexes: [],
    currentIndex: 0,
    recentSongs: JSON.parse(localStorage.getItem(StorageKeys.RECENT_SONGS)) || [],

    isAppPlaying: false,
    isFetchingStreamUrl: false,
    streamUrl: '',

    loopMode: LOOP_MODE.NO_LOOP,
    isShuffle: false,
  },
  extraReducers: {
    // @ts-ignore
    [playSong.pending]: (state) => {
      state.isFetchingStreamUrl = true;
    },

    /**
     * @param {PlayerQueueSliceState} state
     */
    // @ts-ignore
    [playSong.fulfilled]: (state, action) => {
      const { song: newSong, streamUrl } = action.payload;

      state.isFetchingStreamUrl = false;
      state.streamUrl = streamUrl;

      const index = state.songList.findIndex((song) => song.encodeId === newSong.encodeId);
      let nextIndex;

      if (index !== -1) {
        nextIndex = index;
      } else {
        state.songList.push(newSong);
        nextIndex = state.songList.length - 1;
      }
      // add just played song to recent songs

      console.log('nextIndex', nextIndex);
      state.currentIndex = nextIndex;
      state.stackPlayedIndexes.push(nextIndex);
      state.isAppPlaying = true;
    },
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
          state.isAppPlaying = true;
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

    setLoopMode(state, action) {
      state.loopMode = action.payload;
    },

    cycleLoopMode(state) {
      state.loopMode = NEXT_LOOP_MODE[state.loopMode];
    },

    addRecentSong(state, { payload: recentSong }) {
      state.recentSongs = state.recentSongs.filter((song) => song.encodeId !== recentSong.encodeId);
      state.recentSongs.unshift(recentSong);
    },
  },
});

const { actions: playerQueueActions, reducer: playerQueueReducer } = playerQueueSlice;
export const {
  playNext,
  playPrevious,
  setSongs,
  setAppPlaying,
  cycleLoopMode,
  setLoopMode,
  setShuffle,
  addRecentSong,
} = playerQueueActions;
export default playerQueueReducer;
