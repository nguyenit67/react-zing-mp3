import ZMediaCarousel, { createSlideList } from '@/components/ZComponents/ZMediaCarousel';
import ArtistList from '@/features/Artist/components/ArtistList';
import ArtistSkeletonList from '@/features/Artist/components/ArtistSkeletonList';
import getArtistLink from '@/features/Artist/utils/getArtistLink';
import { transformHomeSongSections, useChartHomeQuery, useSpotlightArtists } from '@/features/queries';
import SongMediaList from '@/features/Song/components/SongMediaList';
import SongMediaSkeletonList from '@/features/Song/components/SongMediaSkeletonList';
import clsx from 'clsx';
import { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoadingSkeleton from 'react-loading-skeleton';
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

  const [firstSection, ...restSections] = songSections ?? [];

  // const isLoadingSections = true; // for debug only
  return (
    <div className="home-page">
      <div className={clsx('home__artists-slider', { loading: isLoadingArtists })}>
        {isLoadingArtists ? (
          [...Array(3).keys()].map((index) => (
            <LoadingSkeleton key={index} containerClassName="home__slide-item-skeleton" />
          ))
        ) : (
          <ZMediaCarousel
            // @ts-ignore
            dataSource={createSlideList(artists)}
            renderItem={(artist) => (
              <Link to={getArtistLink(artist)}>
                <img src={artist.thumbnail} alt={artist.name} />
              </Link>
            )}
          />
        )}
      </div>

      {renderHomeMediaList({ ...firstSection, loading: isLoadingSections })}

      <div className="home__media-list">
        {isLoadingArtists ? (
          <ArtistSkeletonList count={5} />
        ) : (
          <ArtistList
            // @ts-ignore
            artistList={artists.slice(0, 5)}
          />
        )}
      </div>

      {isLoadingSections
        ? // @ts-ignore
          [...Array(2).keys()].map((index) => <Fragment key={index}>{renderHomeMediaList({ loading: true })}</Fragment>)
        : restSections.map((section, index) => <Fragment key={index}>{renderHomeMediaList(section)}</Fragment>)}
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
