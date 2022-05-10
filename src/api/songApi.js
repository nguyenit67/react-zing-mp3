import axiosClient from './axiosClient';

const chapterApi = {
  /**
   * @param {{limit: number, page: number}} params */
  getAll(params) {},

  /**
   * @param {string} songId
   */
  get(songId) {
    const url = ``;
    return axiosClient.get(url);
  },
};

export default chapterApi;
