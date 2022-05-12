import ZmSkeletonTheme from '@/layouts/ZmSkeletonTheme';
import { Space } from 'antd';
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
 * }} _props
 */
export default function SongMediaSkeletonList({ type = 'list', className }) {
  return (
    <ZmSkeletonTheme borderRadius="2px">
      <div className={clsx(className, type === 'card' ? 'media-card-list' : 'song-play-list')}>
        {Array.from(Array(5)).map((_, index) =>
          type === 'card' ? (
            <div className="media-card">
              <Skeleton height={140} style={{ marginBottom: '10px' }} />
              <Skeleton count={2} />
            </div>
          ) : (
            '...'
          )
        )}
      </div>
    </ZmSkeletonTheme>
  );
}
