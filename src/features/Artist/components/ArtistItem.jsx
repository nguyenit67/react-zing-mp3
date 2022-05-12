import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import getArtistLink from '../utils/getArtistLink';

/**
 * @typedef { import("@/types").Artist } Artist
 * @param {{artist: Artist, loading?:boolean}} _props
 */
export default function ArtistItem({ artist, loading }) {
  const {
    thumbnail: thumbnailUrl = 'https://i.scdn.co/image/ab6761610000e5ebaad54b2cf9044587eac7acdf',
    name: artistName = 'Unknow NCS Artist',
  } = artist;

  const artistLink = getArtistLink(artist);

  return (
    <div className="artist-item">
      <div className="artist-item__thumbnail">
        {loading ? (
          <Skeleton width={150} height={150} />
        ) : (
          <Link to={artistLink}>
            <img src={thumbnailUrl} alt={artistName} />
          </Link>
        )}
      </div>
      <div className="artist-item__name">
        {loading ? <Skeleton width={100} height={20} /> : <Link to={artistLink}>{artistName}</Link>}
      </div>
    </div>
  );
}
