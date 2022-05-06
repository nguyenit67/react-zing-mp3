import AuthorItem from './AuthorItem';

/**
 * @typedef {import('@/types').Author} Author
 */

/**
 * @param {{
 *  authorList: Author[]
 * }} _props
 */
export default function AuthorList({ authorList }) {
  return (
    <div className="author-list">
      {authorList.map((author, index) => (
        <AuthorItem key={index} author={author} />
      ))}
    </div>
  );
}
