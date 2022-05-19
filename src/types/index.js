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
 *   encodeId: string;
 *   title: string;
 *   thumbnail: string;
 *   thumbnailM: string; // thumbnail with size 240x240
 *   artists?: Artist[]; // server may return or not
 *   artistsNames?: string;
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

/**
 * @template TItem
 * @typedef {{
 *   title: string;
 *   items: TItem[];
 * }} Section
 */

/** @type {Artist} */
export const SAMPLE_ARTIST = {
  id: '69',
  name: 'Rick Atsley',
};
