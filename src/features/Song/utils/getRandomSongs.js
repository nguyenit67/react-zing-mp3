import { SAMPLE_AUTHOR } from '@/types';

export default function getRandomSongs(number = 5) {
  return Array(number).fill({ authors: [SAMPLE_AUTHOR] });
}
