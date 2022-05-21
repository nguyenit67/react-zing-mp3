import StorageKeys from '@/constants/storage-keys';
import React, { useContext, useEffect, useState } from 'react';
import { default as SAMPLE_FAVORITE_SONGS } from '@/json/SAMPLE_FAVORITE_SONGS.json';

/**
 * @typedef {import('@/types').Song} Song
 * @typedef {Song['encodeId']} SongId
 */

const FavoriteSongsContext = React.createContext(null);
export default FavoriteSongsContext;

export const useFavoriteSongs = () => useContext(FavoriteSongsContext);

export const FavoriteSongsProvider = ({ children }) => {
  const [favoriteSongs, setFavoriteSongs] = useState(
    /** @returns {Song[]}  */ () => {
      const favoriteSongsJson = localStorage.getItem(StorageKeys.FAVORITE_SONGS);
      if (favoriteSongsJson) {
        return JSON.parse(favoriteSongsJson);
      }
      console.log(SAMPLE_FAVORITE_SONGS);
      return SAMPLE_FAVORITE_SONGS || [];
    }
  );

  useEffect(() => {
    localStorage.setItem(StorageKeys.FAVORITE_SONGS, JSON.stringify(favoriteSongs));
  }, [favoriteSongs]);

  const favoriteSongsContext = {
    favoriteSongs,
    setFavoriteSongs,

    /** @param {SongId} songIdToCheck */
    checkSongIsFavorite(songIdToCheck) {
      return favoriteSongs.some((song) => song.encodeId === songIdToCheck);
    },
    /** @param {Song} song */
    addFavoriteSong(song) {
      setFavoriteSongs([...favoriteSongs, song]);
    },

    /** @param {SongId} songIdToRemove */
    removeFavoriteSong(songIdToRemove) {
      const songsAfterRemoved = favoriteSongs.filter((song) => song.encodeId !== songIdToRemove);
      setFavoriteSongs(songsAfterRemoved);
    },
  };

  return <FavoriteSongsContext.Provider value={favoriteSongsContext}>{children}</FavoriteSongsContext.Provider>;
};
