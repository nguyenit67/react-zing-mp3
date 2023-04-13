import ZMediaCarousel, { createSlideList } from '@/components/ZComponents/ZMediaCarousel';
import ArtistList from '@/features/Artist/components/ArtistList';
import ArtistSkeletonList from '@/features/Artist/components/ArtistSkeletonList';
import getArtistLink from '@/features/Artist/utils/getArtistLink';
import { transformHomeSongSections, useChartHomeQuery, useSpotlightArtists } from '@/features/queries';
import SongMediaList from '@/features/Song/components/SongMediaList';
import SongMediaSkeletonList from '@/features/Song/components/SongMediaSkeletonList';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

/**
 * @typedef {import('@/types').Artist} Artist
 * @typedef {import('@/types').Song} Song
 * @typedef {import('react-query').UseQueryResult} UseQueryResult
 */

export default function Home() {
  const { data: artists, isLoading: isLoadingArtists } = useSpotlightArtists();

  /** @type {UseQueryResult & {data: any}} */
  const { data: songSections, isLoading: isLoadingSections } = useChartHomeQuery(transformHomeSongSections);

  const [firstSection, ...otherSections] = songSections ?? [];

  // for debug only
  // const isLoadingSections = true;

  return (
    <div className="home-page">
      {isLoadingArtists ? (
        <div className="home__artists-slider loading">
          {Array.from(Array(3).keys()).map((index) => (
            <Skeleton key={index} containerClassName="home__slide-item-skeleton" />
          ))}
        </div>
      ) : // @ts-ignore
      artists.length > 0 ? (
        <div className="home__artists-slider">
          <ZMediaCarousel
            // @ts-ignore
            dataSource={createSlideList(artists)}
            renderItem={(artist) => (
              <Link to={getArtistLink(artist)}>
                <img src={artist.thumbnail} alt={artist.name} />
              </Link>
            )}
          />
        </div>
      ) : null}

      {renderHomeMediaList({ ...firstSection, loading: isLoadingSections })}

      <div className="home__media-list">
        {isLoadingArtists ? (
          <ArtistSkeletonList count={5} />
        ) : // @ts-ignore
        artists.length > 0 ? (
          <ArtistList
            // @ts-ignore
            artistList={artists.slice(0, 5)}
          />
        ) : null}
      </div>

      {isLoadingSections
        ? // @ts-ignore
          Array.from(Array(2)).map(() => renderHomeMediaList({ loading: true }))
        : otherSections.map((section) => renderHomeMediaList(section))}
    </div>
  );
}

/**
 * @typedef {import('@/types').Section<Song>} SongSection
 * @param {SongSection & {loading?: boolean}} _params
 */
function renderHomeMediaList({ items, loading = false, title = 'Nhạc mới mỗi ngày' }) {
  return loading ? (
    <div className="home__media-list">
      <Skeleton width={200} height={20} style={{ marginBottom: '5px' }} />
      <SongMediaSkeletonList type="card" />
    </div>
  ) : (
    <div className="home__media-list">
      <h3 className="zm-title">{title}</h3>

      <SongMediaList type="card" songList={items} />
    </div>
  );
}
