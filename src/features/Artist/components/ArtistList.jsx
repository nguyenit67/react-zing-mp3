import ArtistItem from './ArtistItem';

/**
 * @typedef {import('@/types').Artist} Artist
 */

/**
 * @param {{
 *  authorList: Artist[]
 * }} _props
 */
export default function ArtistList({ authorList }) {
  return (
    <div className="author-list">
      {authorList.map((author, index) => (
        <ArtistItem key={index} artist={author} />
      ))}
    </div>
  );
}
