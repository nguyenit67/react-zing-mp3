import getArtistLink from '@/features/Artist/utils/getArtistLink';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

/**
 * @typedef {import('@/types').Artist} Artist
 * @param {Artist[]} artistList
 */
export default function renderArtistsLinkText(artistList) {
  return artistList.map((artist, index) => (
    <Fragment key={index}>
      {/* render ', ' before all items except the first */}
      {index > 0 && ', '}
      <Link to={getArtistLink(artist)}>{artist.name}</Link>
    </Fragment>
  ));
}
