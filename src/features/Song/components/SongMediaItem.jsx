import { common } from '@/constants';
import renderArtistsLinkText from '@/features/Song/utils/renderArtistsLinkText';
import clsx from 'clsx';
import { useState } from 'react';
import { useFavoriteSongs } from '../context/FavoriteSongsContext';

/**
 *
 * @param {{
 *  song: import('@/types').Song
 *  type: 'card-item'  | 'list-item'
 *  durationInvisible?: boolean
 * }} _props
 */

export default function SongMediaItem({ song, type: displayType = 'list-item', durationInvisible = false }) {
  const showDuration = !durationInvisible;

  const { addFavoriteSong, removeFavoriteSong, checkSongIsFavorite } = useFavoriteSongs();
  const isFavorite = checkSongIsFavorite(song.encodeId);

  const {
    thumbnailM: thumbnailUrl = 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    title: songName = 'Never Gonna Give You Up (500)',
    artists: songArtists,
  } = song;

  const useSongMediaState = () => ({});

  const {
    isActive = false,
    isPlaying = false,
    // @ts-ignore
  } = useSongMediaState(song);

  const [playing, setPlaying] = useState(isPlaying || false);

  const handleClickPlayButton = () => {
    // this is for UI testing
    if (isActive) {
      setPlaying(!playing);
    }
  };

  const handleClickFavoriteButton = () => {
    if (isFavorite) {
      removeFavoriteSong(song.encodeId);
      return;
    }
    addFavoriteSong(song);
  };

  const buttonFavoriteEl = (
    <button
      className={clsx(['zm-button', 'zm-button-favorite'], { 'is-favorite': isFavorite })}
      onClick={handleClickFavoriteButton}
    >
      {isFavorite ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
    </button>
  );

  return (
    <>
      {displayType === 'card-item' && (
        <div className={clsx('media-card', { active: isActive })}>
          <div className="media-card__thumbnail">
            <img src={thumbnailUrl} alt={songName} />
            <div className="media-card__actions">
              {buttonFavoriteEl}
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
            <div className="media-card__author">{renderArtistsLinkText(songArtists)}</div>
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
              <div className="media-item__author">{renderArtistsLinkText(songArtists)}</div>
            </div>
          </div>
          <div className="media-item__actions">
            {buttonFavoriteEl}
            <button className="zm-button">
              <i className="fa-solid fa-ellipsis"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
