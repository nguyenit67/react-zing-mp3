// export {};

/**
 * @typedef {{
 *   id: string;
 *   name: string;
 *   thumbnailUrl?: string;
 * }} Author
 * */

/**
 * @typedef {SongObject} Song
 * @typedef {{
 *   id: string;
 *   title: string;
 *   thumbnailUrl: string;
 *   authors: Author[];
 *   isActive: boolean;
 *   isPlaying: boolean;
 *   isFavorite: boolean;
 * }} SongObject
 *  */

/*** @type {Author} */

export const SAMPLE_AUTHOR = {
  id: '69',
  name: 'Rick Atsley',
};
