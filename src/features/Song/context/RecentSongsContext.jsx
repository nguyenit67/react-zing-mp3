import StorageKeys from '@/constants/storage-keys';
import React, { useContext, useEffect, useState } from 'react';

/**
 * @typedef {import('@/types').Song} Song
 * @typedef {Song['encodeId']} SongId
 */

const RecentSongsContext = React.createContext(null);
export default RecentSongsContext;

export const useRecentSongs = () => useContext(RecentSongsContext);

export const RecentSongsProvider = ({ children }) => {
  const [recentSongs, setRecentSongs] = useState(/** @type {Song[]}  */ []);

  useEffect(() => {
    localStorage.setItem(StorageKeys.RECENT_SONGS, JSON.stringify(recentSongs));
  }, [recentSongs]);

  const RecentSongsContext = {
    recentSongs,
    setRecentSongs,

    /** @param {Song} song */
    addRecentSong(song) {
      setRecentSongs([song, ...recentSongs]);
    },

    /** @param {SongId} songIdToRemove */
    removeRecentSong(songIdToRemove) {
      const songsAfterRemoved = recentSongs.filter((song) => song.encodeId !== songIdToRemove);
      setRecentSongs(songsAfterRemoved);
    },
  };

  return <RecentSongsContext.Provider value={RecentSongsContext}>{children}</RecentSongsContext.Provider>;
};
