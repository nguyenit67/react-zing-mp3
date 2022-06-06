import axiosClient from './axiosClient';

const songApi = {
  /**
   * @param {{limit: number, page: number}} params */
  getAll(params) {},

  getTop100() {},

  getChartHome() {
    const url = '/chart-home';
    return axiosClient.get(url);
  },

  getHome({ page }) {
    const url = `/home?page=${page}`;
    return axiosClient.get(url);
  },

  /** @param {string} songId */
  getDetail(songId) {
    const url = ``;
    return axiosClient.get(url);
  },

  getMp3(songId) {
    const url = `/song?id=${songId}`;
    return axiosClient.get(url);
  },
};

export default songApi;
