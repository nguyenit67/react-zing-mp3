import AuthorItem from '@/features/Author/components/AuthorItem';
import SongMediaList from '@/features/Song/components/SongMediaList';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';
import { SAMPLE_AUTHOR } from '@/types';

export default function Home() {
  return (
    <div>
      <div className="home__media-list">
        <div className="author-list">
          {Array.from(Array(5)).map(() => (
            <AuthorItem author={SAMPLE_AUTHOR} />
          ))}
        </div>
      </div>

      {Array.from(Array(6)).map(() => (
        <div className="home__media-list">
          <h3 className="zm-title">Nhạc mới mỗi ngày</h3>

          <SongMediaList type="card" songList={getRandomSongs(5)} />
        </div>
      ))}
    </div>
  );
}
