import { common } from '@/constants';
import renderAuthorsLink from '@/features/Song/utils/renderAuthorsLink';
import clsx from 'clsx';
import { useState } from 'react';

/**
 *
 * @param {{
 *  song: import('@/types').Song
 *  type: 'card-item'  | 'list-item'
 * }} _props
 */

export default function SongMediaItem({ song, type: displayType = 'list-item' }) {
  const {
    thumbnailUrl = 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    title: songName = 'Never Gonna Give You Up (500)',

    isActive = false,
    isPlaying = false,
    isFavorite = false,
    authors: songAuthors,
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
    <>
      {displayType === 'card-item' && (
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
            <div className="media-card__author">{renderAuthorsLink(songAuthors)}</div>
          </div>
        </div>
      )}
      {/* display as list-item */}
      {displayType !== 'card-item' && (
        <div className={clsx('media-item', { active: isActive })}>
          <div className="media-item__content">
            <div className="media-item__thumbnail">
              <img src={thumbnailUrl} alt={songName} />
              <button className="zm-button" onClick={handleClickPlayButton}>
                {playing ? <img src={common.SOUND_PLAYING_GIF} alt="" /> : <i className="fa-solid fa-play"></i>}
              </button>
            </div>
            <div className="media-item__info">
              <div className="media-item__name">{songName}</div>
              <div className="media-item__author">{renderAuthorsLink(songAuthors)}</div>
            </div>
          </div>
          <div className="media-item__actions">
            <button className="zm-button">
              {isFavorite ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
            </button>
            <button className="zm-button">
              <i className="fa-solid fa-ellipsis"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
