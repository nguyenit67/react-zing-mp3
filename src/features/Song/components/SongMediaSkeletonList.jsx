import ZmSkeletonTheme from '@/layouts/ZmSkeletonTheme';
import { Col, Row, Space } from 'antd';
import clsx from 'clsx';
import { Fragment } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

/**
 * @typedef {import('@/types').Song} Song
 */

/***
 * @param {{
 *  type?: 'card' | 'list';
 *  className?: string;
 *  count?: number;
 * }} _props
 */
export default function SongMediaSkeletonList({ type = 'list', className, count }) {
  const displayCount = count || (type === 'card' ? 5 : 9);

  return (
    <ZmSkeletonTheme borderRadius="2px">
      <div className={clsx(className, type === 'card' ? 'media-card-list' : 'song-play-list')}>
        {type === 'card'
          ? [...Array(displayCount).keys()].map((index) => (
              <div key={index} className="media-card">
                <Skeleton height={140} borderRadius="8px" style={{ marginBottom: '5px' }} />
                <Skeleton count={2} height={10} />
              </div>
            ))
          : [...Array(displayCount).keys()].map((index) => (
              <Row key={index} align="middle" style={{ padding: '5px' }}>
                <Col>
                  <Skeleton width={40} height={40} borderRadius="4px" style={{ marginRight: '10px' }} />
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Col>
                    <Skeleton width={200} />
                    <Skeleton width={100} />
                  </Col>
                </Col>
              </Row>
            ))}
      </div>
    </ZmSkeletonTheme>
  );
}
