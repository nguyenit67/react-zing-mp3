import { Fragment } from 'react';
import { Link } from 'react-router-dom';

/**
 * @typedef {import('@/types').Author} Author
 * @param {Author[]} authorList
 */
export default function renderAuthorsLink(authorList) {
  return authorList.map((author, index) => (
    <Fragment key={index}>
      {/* render ', ' before all items except the first */}
      {index > 0 && ', '}
      <Link to={`/author/${author.id}`}>{author.name}</Link>
    </Fragment>
  ));
}
