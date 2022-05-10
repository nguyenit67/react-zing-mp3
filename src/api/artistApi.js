import axiosClient from './axiosClient';

export function transformToArtist({ data }) {
  const songList = data.sections
    .filter((sect) => sect.sectionType === 'song')
    .map(({ items }) => items)
    .flat(); // flatten concat all array

  /**
   * @type {import('@/types').Artist}*/
  const artist = {
    id: data.id,
    alias: data.alias,
    name: data.name,
    thumbnail: data.thumbnail,
    songList,
  };

  return artist;
}

const artistApi = {
  /** @param {string} artistAlias */
  getDetail(artistAlias) {
    const url = `https://music-player-pink.vercel.app/api/artist?name=${artistAlias}`;

    return axiosClient.get(url);
  },
};

export default artistApi;
