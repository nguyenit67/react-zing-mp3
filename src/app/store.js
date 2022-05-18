import playerQueueReducer from '@/features/Song/reducers/playerQueueSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = {
  playerQueue: playerQueueReducer,
  // recentSongs: recentSongsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
