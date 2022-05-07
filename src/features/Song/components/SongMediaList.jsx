import clsx from 'clsx';
import SongMediaItem from './SongMediaItem';

/**
 * @typedef {import('@/types').Song} Song
 */

/***
 * @param {{
 *  type?: 'card' | 'list';
 *  songList: Song[];
 *  className?: string;
 *  durationInvisible?: boolean;
 * }} _props
 */
export default function SongMediaList({ songList = [], type = 'list', className, durationInvisible = false }) {
  return (
    <div className={clsx(className, type === 'card' ? 'media-card-list' : 'song-play-list')}>
      {songList.map((song, index) => (
        <SongMediaItem key={index} type={`${type}-item`} song={song} durationInvisible={durationInvisible} />
      ))}
    </div>
  );
}
