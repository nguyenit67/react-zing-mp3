import { useSelector } from 'react-redux';
import { selectCurrentPlayingSong } from '../reducers/selectors';

/**
 * @param {import('@/types').Song} song
 */
export default function useIsSongActive(song) {
  const activeSong = useSelector(selectCurrentPlayingSong);
  if (!activeSong) {
    return false;
  }

  return song.encodeId === activeSong.encodeId;
}
