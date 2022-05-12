import Skeleton from 'react-loading-skeleton';
import ArtistItem from './ArtistItem';

/**
 * @typedef {import('@/types').Artist} Artist
 */

/**
 * @param {{
 *  artistList?: Artist[];
 *  skeleton?: boolean;
 *  count?: number;
 * }} _props
 */
export default function ArtistList({ artistList, skeleton: loading, count }) {
  return (
    <div className="artist-list">
      {Array.from(artistList ?? Array(count)).map((artist, index) => (
        <ArtistItem key={index} loading={loading} artist={artist ?? {}} />
      ))}
    </div>
  );
}
