import axiosClient from './axiosClient';

/**
 * @typedef {import('@/types').Artist} Artist
 * @returns {Artist[]}
 */
export function transformHomeToArtists({ data }) {
  const artistsSection = data.items.find(
    (item) => item.sectionType === 'artistSpotlight' && item.viewType === 'slider'
  );

  const artistList = artistsSection.items;
  return artistList;
}

const songApi = {
  /**
   * @param {{limit: number, page: number}} params */
  getAll(params) {},

  getHome({ page = 3 }) {
    const url = `https://music-player-pink.vercel.app/api/home?page=${page}`;
    return axiosClient.get(url);
  },

  /** @param {string} songId */
  getDetail(songId) {
    const url = ``;
    return axiosClient.get(url);
  },

  getStream(songId) {},
};

export default songApi;
