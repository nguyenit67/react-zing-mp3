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
    name: authorName = 'Unknow NCS Artist',
  } = artist;

  const artistLink = getArtistLink(artist);

  return (
    <div className="author-item">
      <div className="author-item__thumbnail">
        {loading ? (
          <Skeleton width={150} height={150} />
        ) : (
          <Link to={artistLink}>
            <img src={thumbnailUrl} alt={authorName} />
          </Link>
        )}
      </div>
      <div className="author-item__name">
        {loading ? <Skeleton width={100} height={20} /> : <Link to={artistLink}>{authorName}</Link>}
      </div>
    </div>
  );
}
