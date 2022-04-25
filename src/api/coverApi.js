import axiosClient from './axiosClient';

const coverApi = {
  getAll(params) {},

  /** @param {string} coverId */
  get(coverId) {
    const url = `/cover/${coverId}`;
    return axiosClient.get(url);
  },
};

export default coverApi;
