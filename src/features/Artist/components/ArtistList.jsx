import Skeleton from 'react-loading-skeleton';
import ArtistItem from './ArtistItem';

/**
 * @typedef {import('@/types').Artist} Artist
 */

/**
 * @param {{
 *  artistList?: Artist[];
 *  loading?: boolean;
 *  count?: number;
 * }} _props
 */
export default function ArtistList({ artistList, loading, count }) {
  return (
    <div className="author-list">
      {Array.from(artistList ?? Array(count)).map((artist, index) => (
        <ArtistItem key={index} loading={loading} artist={artist ?? {}} />
      ))}
    </div>
  );
}
