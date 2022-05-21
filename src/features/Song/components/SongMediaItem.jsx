import ZmIcon from '@/components/ZComponents/ZmIcon';
import { common } from '@/constants';
import renderArtistsLinkText from '@/features/Song/utils/renderArtistsLinkText';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFavoriteSongs } from '../context/FavoriteSongsContext';
import useIsSongActive from '../hooks/useIsSongActive';
import { playSong, setAppPlaying } from '../reducers/playerQueueSlice';
import { selectIsAppPlaying } from '../reducers/selectors';

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
  const isAppPlaying = useSelector(selectIsAppPlaying);

  const isActive = useIsSongActive(song);
  const isItemPlaying = isActive && isAppPlaying;

  const { addFavoriteSong, removeFavoriteSong, checkSongIsFavorite } = useFavoriteSongs();
  const isFavorite = checkSongIsFavorite(song.encodeId);

  const {
    thumbnailM: thumbnailUrl = 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    title: songName = 'Untitled',
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
    if (isActive) {
      dispatch(setAppPlaying(!isAppPlaying));
      return;
    }
    (async () => {
      try {
        // @ts-ignore
        const fetchStreamResult = await dispatch(playSong(song)).unwrap();
      } catch (error) {
        console.log('Not found stream source', error.message);
      }
    })();
  };

  useEffect(() => {
    if (!isActive) return;

    listItemElRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [isActive]);

  const artistsLinkText = songArtists ? renderArtistsLinkText(songArtists) : song.artistsNames;
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
      {isItemPlaying ? <img src={common.SOUND_PLAYING_GIF} alt="" /> : <ZmIcon className="ic-play" />}
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
                <ZmIcon className="ic-more" />
              </button>
            </div>
          </div>

          <div className="media-card__info">
            <div className="media-card__name">{songName}</div>
            <div className="media-card__artist">{artistsLinkText}</div>
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
              <div className="media-item__artist">{artistsLinkText}</div>
            </div>
          </div>
          <div className="media-item__actions">
            {favoriteButtonElement}
            <button className="zm-button">
              <ZmIcon className="ic-more" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
