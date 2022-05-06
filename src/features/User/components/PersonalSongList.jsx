import SongMediaList from '@/features/Song/components/SongMediaList';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';

export default function PersonalSongList() {
  return (
    <div className="personal-page__song-list">
      <h3 className="zm-title">Bài hát</h3>

      <SongMediaList type="list" songList={getRandomSongs(5)} />
    </div>
  );
}
