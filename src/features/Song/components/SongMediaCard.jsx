import { common } from '@/constants';
import clsx from 'clsx';
import { useState } from 'react';

/**
 *
 * @param {any} _props
 */
export default function SongMediaCard({ song = {} }) {
  const {
    thumbnailUrl = 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    songName = 'Never Gonna Give You Up (500)',
    authorName = 'Rick Atsley',
    songId = -1,
    authorId = 69,
    isFavorite = false,
    isActive = false,
    isPlaying = false,
  } = song;

  const [playing, setPlaying] = useState(isPlaying || false);

  const handleClickPlayButton = () => {
    // this is for UI testing
    if (!isActive) {
      return;
    }

    setPlaying(!playing);
  };

  return (
    <div className={clsx('media-card', { active: isActive })}>
      <div className="media-card__thumbnail">
        <img src={thumbnailUrl} alt={songName} />
        <div className="media-card__actions">
          <button className="zm-button">
            {isFavorite ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
          </button>
          <button className="zm-button zm-button-play" onClick={handleClickPlayButton}>
            {playing ? <img src={common.SOUND_PLAYING_GIF} alt="" /> : <i className="fa-solid fa-play"></i>}
          </button>
          <button className="zm-button">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>

      <div className="media-card__info">
        <div className="media-card__name">{songName}</div>
        <div className="media-card__author">
          <a href={`/author/${authorId}`}>{authorName}</a>
        </div>
      </div>
    </div>
  );
}
