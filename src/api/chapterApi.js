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
   * @param {string} chapterId
   */
  get(chapterId) {
    const url = `/chapter/${chapterId}`;
    return axiosClient.get(url);
  },

  async getImages(chapterId) {
    const url = `/at-home/server/${chapterId}`;
    const meta = await axiosClient.get(url);
    const chapterHash = meta.chapter.hash;

    const images = {};

    for (const key in QUALITY_MODES) {
      const currentQuality = QUALITY_MODES[key];
      const fileNameList = currentQuality === QUALITY_MODES.DATA ? meta.chapter.data : meta.chapter.dataSaver;

      images[currentQuality] = fileNameList.map((fileName) => {
        const pathArray = [meta.baseUrl, currentQuality, chapterHash, fileName];
        return pathArray.join('/');
      });
    }

    return images;
  },
};

export default chapterApi;
