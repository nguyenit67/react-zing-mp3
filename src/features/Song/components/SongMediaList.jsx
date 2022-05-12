import { Col, Row, Skeleton, Space } from 'antd';
import clsx from 'clsx';
import { Fragment } from 'react';
import SongMediaItem from './SongMediaItem';

/**
 * @typedef {import('@/types').Song} Song
 */

/***
 * @param {{
 *  type?: 'card' | 'list';
 *  songList?: Song[];
 *  className?: string;
 *  durationInvisible?: boolean;
 *  loading?: boolean
 * }} _props
 */
export default function SongMediaList({
  songList = [],
  type = 'list',
  className,
  loading = false,
  // durationInvisible = false,
}) {
  /** @type {'card-item' | 'list-item'} */
  const itemType = `${type}-item`;

  return (
    <div className={clsx(className, type === 'card' ? 'media-card-list' : 'song-play-list')}>
      {loading
        ? Array.from(Array(5)).map((_, index) => (
            <Skeleton key={index} avatar={{ shape: 'square' }} title paragraph={{ rows: 1 }} />
          ))
        : songList.map((song, index) => (
            // <Col xs={12} sm={8} md={6} >
            <SongMediaItem key={index} type={itemType} song={song} />
            // </Col>
          ))}
    </div>
  );
}
