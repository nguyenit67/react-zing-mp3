import { SAMPLE_ARTIST } from '@/types';

/**
 * @typedef {import('@/types').Song} Song
 */
/**
 * @param {number} number
 * @returns {any[]}
 */
export default function getRandomSongs(number = 5) {
  /**
   * @type {Partial<Song>[]}*/
  const list = Array(number).fill({ artists: [SAMPLE_ARTIST] });
  return list;
}
