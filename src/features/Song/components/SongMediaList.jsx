import SongMediaItem from './SongMediaItem';

/**
 * @typedef {import('@/types').Song} Song
 */

/***
 * @param {{
 *  type?: 'card' | 'list'
 *  songList: Song[]
 * }} _props
 */
export default function SongMediaList({ songList = [], type = 'list' }) {
  return (
    <div className={type === 'card' ? 'media-card-list' : 'song-play-list'}>
      {songList.map((song, index) => (
        <SongMediaItem key={index} type={`${type}-item`} song={song} />
      ))}
    </div>
  );
}
