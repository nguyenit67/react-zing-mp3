import SongMediaList from '@/features/Song/components/SongMediaList';
import { useFavoriteSongs } from '@/features/Song/context/FavoriteSongsContext';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';

export default function PersonalSongList() {
  const { favoriteSongs } = useFavoriteSongs();

  return (
    <div className="personal-page__song-list">
      <h3 className="zm-title">Bài hát</h3>

      <SongMediaList type="list" songList={favoriteSongs} />
    </div>
  );
}
