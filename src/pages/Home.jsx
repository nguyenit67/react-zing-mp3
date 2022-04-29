import AuthorItem from '@/features/Author/components/AuthorItem';
import SongMediaCard from '@/features/Song/components/SongMediaCard';

export default function Home() {
  return (
    <div>
      <div className="home__media-list">
        <div className="author-list">
          {Array.from(Array(5)).map(() => (
            <AuthorItem author={{}} />
          ))}
        </div>
      </div>

      {Array.from(Array(6)).map(() => (
        <div className="home__media-list">
          <h3 className="zm-title">Nhạc mới mỗi ngày</h3>

          <div className="media-card-list">
            {Array.from(Array(5)).map(() => (
              <SongMediaCard />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
