import ZmIcon from '@/components/ZComponents/ZmIcon';
import { common } from '@/constants';
import renderArtistsLinkText from '@/features/Song/utils/renderArtistsLinkText';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFavoriteSongs } from '../context/FavoriteSongsContext';
import useIsSongActive from '../hooks/useIsSongActive';
import { playSong, setAppPlaying } from '../reducers/playerQueueSlice';
import { selectPlayer } from '../reducers/selectors';

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
  const dispatch = useDispatch();

  /**
   * @typedef {import('../reducers/playerQueueSlice').PlayerQueueSliceState} PlayerQueueSliceState
   */

  /** @type {PlayerQueueSliceState} */
  const { isAppPlaying } = useSelector(selectPlayer);
  const isActive = useIsSongActive(song);
  const isItemPlaying = isActive && isAppPlaying;

  const { addFavoriteSong, removeFavoriteSong, checkSongIsFavorite } = useFavoriteSongs();
  const isFavorite = checkSongIsFavorite(song.encodeId);

  const {
    thumbnailM: thumbnailUrl = 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    title: songName = 'Never Gonna Give You Up (500)',
    artists: songArtists,
  } = song;

  const listItemElRef = useRef(null);

  const handleClickFavoriteButton = () => {
    if (isFavorite) {
      removeFavoriteSong(song.encodeId);
      return;
    }
    addFavoriteSong(song);
  };

  const handleClickPlayButton = () => {
    if (!isActive) {
      console.log({ song, isActive, isAppPlaying });
      dispatch(playSong(song));
      return;
    }

    dispatch(setAppPlaying(!isAppPlaying));
  };

  useEffect(() => {
    if (!isActive) return;

    listItemElRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [isActive]);

  const favoriteButtonElement = (
    <button
      className={clsx(['zm-button', 'zm-button-favorite'], { 'is-favorite': isFavorite })}
      onClick={handleClickFavoriteButton}
    >
      {isFavorite ? <ZmIcon className="ic-like-full" /> : <ZmIcon className="ic-like" />}
    </button>
  );

  const playButtonElement = (
    <button className="zm-button zm-button-play" onClick={handleClickPlayButton}>
      {isItemPlaying ? <img src={common.SOUND_PLAYING_GIF} alt="" /> : <i className="fa-solid fa-play"></i>}
    </button>
  );

  return (
    <>
      {displayType === 'card-item' && (
        <div className={clsx('media-card', { active: isActive, 'is-playing': isItemPlaying })}>
          <div className="media-card__thumbnail">
            <img src={thumbnailUrl} alt={songName} />
            <div className="media-card__actions">
              {favoriteButtonElement}
              {playButtonElement}
              <button className="zm-button">
                <i className="fa-solid fa-ellipsis"></i>
              </button>
            </div>
          </div>

          <div className="media-card__info">
            <div className="media-card__name">{songName}</div>
            <div className="media-card__artist">{renderArtistsLinkText(songArtists)}</div>
          </div>
        </div>
      )}
      {/* display as list-item */}
      {displayType !== 'card-item' && (
        <div ref={listItemElRef} className={clsx('media-item', { active: isActive })}>
          <div className="media-item__content">
            <div className="media-item__thumbnail">
              <img src={thumbnailUrl} alt={songName} />
              {playButtonElement}
            </div>
            <div className="media-item__info">
              <div className="media-item__name">{songName}</div>
              <div className="media-item__artist">{renderArtistsLinkText(songArtists)}</div>
            </div>
          </div>
          <div className="media-item__actions">
            {favoriteButtonElement}
            <button className="zm-button">
              <i className="fa-solid fa-ellipsis"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
