import NoContentBox from '@/components/NoContentBox';
import SongMediaList from '@/features/Song/components/SongMediaList';
import { useFavoriteSongs } from '@/features/Song/context/FavoriteSongsContext';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';

export default function PersonalSongList() {
  const { favoriteSongs } = useFavoriteSongs();

  return favoriteSongs.length > 0 ? (
    <div className="personal-page__song-list">
      <h3 className="zm-title">Bài hát</h3>

      <SongMediaList type="list" songList={favoriteSongs} />
    </div>
  ) : (
    <NoContentBox message="Hãy nhấn ♥ để lưu bài hát yêu thích " />
  );
}
