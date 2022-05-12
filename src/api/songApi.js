import axiosClient from './axiosClient';

const songApi = {
  /**
   * @param {{limit: number, page: number}} params */
  getAll(params) {},

  getTop100() {},

  getChartHome() {
    const url = 'https://music-player-pink.vercel.app/api/chart-home';
    return axiosClient.get(url);
  },

  getHome({ page }) {
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
