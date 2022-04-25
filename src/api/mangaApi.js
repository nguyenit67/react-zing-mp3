import axiosClient from './axiosClient';
import coverApi from './coverApi';

/**
 * @typedef {'small' | 'medium' | 'large' | 'original' } ThumbnailSize
 */

const mangaApi = {
  /**
   * @param {{limit: number, page: number}} params */
  async getAll(params) {
    const newParams = {
      ...params,
      // prettier-ignore
      offset: (!params.page || (params.page <= 1)) ? 0 : (params.page - 1) * (params.limit || 40),
    };

    delete newParams.page;

    // api query parameters {limit: number, offset: number}
    /** @type {any} */
    const res = await axiosClient.get('/manga', { params: newParams });

    return {
      data: res.data,
      pagination: {
        page: params.page,
        limit: params.limit,
        total: res.total,
      },
    };
  },

  get(id) {
    const url = `/manga/${id}`;
    return axiosClient.get(url);
  },

  /**
   * @param {{mangaId: string, coverId: string}} mangaAndCoverIds
   * @param {ThumbnailSize} size
   */
  async getCoverUrl({ mangaId, coverId }, size = 'small') {
    /** @type {{[value in size]: string}} */
    const sizeExtensions = {
      original: '',
      large: '',
      medium: '.512.jpg',
      small: '.256.jpg',
    };

    const coverFileName = (await coverApi.get(coverId)).data.attributes.fileName;

    const baseUrl = 'https://uploads.mangadex.org/covers';
    const url = [baseUrl, mangaId, coverFileName].join('/');
    const imageUrl = `${url}${sizeExtensions[size]}`;

    return imageUrl;
  },

  getVolumes(mangaId, params = {}) {
    const url = `/manga/${mangaId}/aggregate`;
    return axiosClient.get(url, { params });
  },
  // async _getCoverFileName(coverId) {
  //   const coverData = await coverApi.get(coverId);

  //   return coverData.data.attributes.fileName;
  // },
};

export default mangaApi;
