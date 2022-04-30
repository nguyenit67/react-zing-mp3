import { Link } from 'react-router-dom';

/**
 * @typedef { import("@/types").Author } Author
 * @param {{author: Author}} _props
 */
export default function AuthorItem({ author }) {
  const {
    thumbnailUrl = 'https://i.scdn.co/image/ab6761610000e5ebaad54b2cf9044587eac7acdf',
    name: authorName = 'Unknow NCS Artist',
    id: authorId = 9999999,
  } = author;

  const authorUrl = `/author/${authorId}`;

  return (
    <div className="author-item">
      <div className="author-item__thumbnail">
        <Link to={authorUrl}>
          <img src={thumbnailUrl} alt={authorName} />
        </Link>
      </div>
      <div className="author-item__name">
        <Link to={authorUrl}>{authorName}</Link>
      </div>
    </div>
  );
}
