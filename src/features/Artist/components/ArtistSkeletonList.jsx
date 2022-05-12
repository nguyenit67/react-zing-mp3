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
 *  className?: string;
 *  count?: number;
 * }} _props
 */
export default function ArtistSkeletonList({ className, count = 5 }) {
  return (
    <ZmSkeletonTheme>
      <div className={clsx(className, 'artist-skeleton-list')}>
        {[...Array(count).keys()].map((index) => (
          <div key={index} className="artist-item artist-skeleton-item">
            <Skeleton height={150} width={150} borderRadius="50%" style={{ marginBottom: '5px' }} />
            <Skeleton width={100} height={20} />
          </div>
        ))}
      </div>
    </ZmSkeletonTheme>
  );
}
