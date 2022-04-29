import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

AuthorItem.propTypes = {};

export default function AuthorItem({ author }) {
  const {
    thumbnailUrl = 'https://i.scdn.co/image/ab6761610000e5ebaad54b2cf9044587eac7acdf',
    authorId = 69,
    authorName = 'Ship Wrek & Zookeepers',
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
