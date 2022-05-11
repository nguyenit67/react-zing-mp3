import songApi, { transformHomeToArtists } from '@/api/songApi';
import ZMediaCarousel, { createSlideList } from '@/components/ZComponents/ZMediaCarousel';
import ArtistList from '@/features/Artist/components/ArtistList';
import getArtistLink from '@/features/Artist/utils/getArtistLink';
import SongMediaList from '@/features/Song/components/SongMediaList';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

/**
 * @typedef {import('@/types').Artist} Artist
 */

export default function Home() {
  const page = 3;
  const {
    data: artists,
    isLoading: isLoadingArtists,
    isError,
  } = useQuery(['home'], () => songApi.getHome({ page }), {
    select: transformHomeToArtists,
  });

  // const isLoadingArtists = true; // for debug only

  return (
    <div className="home-page">
      <div className={clsx('home__artists-slider', { loading: isLoadingArtists })}>
        {isLoadingArtists ? (
          Array.from(Array(3)).map((_, index) => <Skeleton containerClassName="home__slide-item-skeleton" />)
        ) : (
          <ZMediaCarousel
            dataSource={createSlideList(artists)}
            renderItem={(artist) => (
              <Link to={getArtistLink(artist)}>
                <img src={artist.thumbnail} alt={artist.name} />
              </Link>
            )}
          />
        )}
      </div>

      {renderHomeMediaList()}

      {/* <div className="home__media-list">
        <ArtistList authorList={artists} />
      </div> */}

      {renderHomeMediaList()}
      {renderHomeMediaList()}
      {renderHomeMediaList()}
      {renderHomeMediaList()}
    </div>
  );
}

function renderHomeMediaList() {
  return (
    <div className="home__media-list">
      <h3 className="zm-title">Nhạc mới mỗi ngày</h3>

      <SongMediaList type="card" songList={getRandomSongs(5)} />
    </div>
  );
}
