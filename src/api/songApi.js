// @ts-nocheck
import axiosClient from './axiosClient';

export const QUALITY_MODES = {
  DATA: 'data',
  DATA_SAVER: 'data-saver',
};

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
