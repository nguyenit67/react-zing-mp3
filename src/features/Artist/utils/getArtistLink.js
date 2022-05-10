/**
 * @typedef {import('@/types').Artist} Artist
 * @param {Artist} artist
 */
export default function getArtistLink(artist) {
  return `/artist/${artist.alias}`; // api defined
}
