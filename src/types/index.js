// export {};

/**
 * @typedef {{
 *   id: string;
 *   alias: string;
 *   name: string;
 *   thumbnail?: string;
 *   songList?: Song[];
 * }} Artist
 * */

/**
 * @typedef {SongObject} Song
 * @typedef {{
 *   id: string;
 *   title: string;
 *   thumbnail: string;
 *   artists: Artist[];
 *   duration: number;
 *   songUrl?: string;
 * }} SongObject
 * */

/**
 * @typedef {{
 *   isActive: boolean;
 *   isPlaying: boolean;
 *   isFavorite: boolean;
 *   songUrl?: string;
 * }} SongMediaState
 */

/*** @type {Author} */

export const SAMPLE_ARTIST = {
  id: '69',
  name: 'Rick Atsley',
};
