import { common } from '@/constants';
import StorageKeys from '@/constants/storage-keys';
import { useSongMp3 } from '@/features/queries';
import {
  cycleLoopMode,
  LOOP_MODE,
  playNext,
  playPrevious,
  setAppPlaying,
  setShuffle,
} from '@/features/Song/reducers/playerQueueSlice';
import {
  selectCurrentPlayingSong,
  selectIsAppPlaying,
  selectIsShuffle,
  selectPlayerQueueList,
  selectPlayingIndex,
  selectRepeatMode,
} from '@/features/Song/reducers/selectors';
import renderArtistsLinkText from '@/features/Song/utils/renderArtistsLinkText';
import { SAMPLE_ARTIST } from '@/types';
import { formatTime } from '@/utils';
import { Slider } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ZmIcon from './ZComponents/ZmIcon';

/**
 * @typedef {import('@/types').Song} Song
 * @typedef {import('@/features/Song/reducers/playerQueueSlice').PlayerQueueSliceState} PlayerQueueSliceState
 */

const LOOP_ICON = {
  [LOOP_MODE.NO_LOOP]: <ZmIcon className="ic-repeat" />,
  [LOOP_MODE.LOOP_ONE]: <ZmIcon className="ic-repeat-one" />,
  [LOOP_MODE.LOOP_ALL]: <ZmIcon className="ic-repeat" />,
};

export default function PlayerBar() {
  const dispatch = useDispatch();
  /**
   * @type {React.MutableRefObject<HTMLAudioElement>} */
  const audioRef = useRef();

  /** @type {Song} */
  const currentSong = useSelector(selectCurrentPlayingSong) ?? {};
  const playingIndex = useSelector(selectPlayingIndex);
  const isAppPlaying = useSelector(selectIsAppPlaying);
  const repeatMode = useSelector(selectRepeatMode);

  const isShuffle = useSelector(selectIsShuffle);

  const [volume, setVolume] = useState(() => {
    return JSON.parse(localStorage.getItem(StorageKeys.VOLUME)) || 0.5;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const isAudioPlaying = useRef(false);

  // const hasSongInPlayer = songList.length > 0;
  const { data: songMp3Url, isLoading: isFetchingMp3Url } = useSongMp3(
    currentSong.encodeId,
    Boolean(currentSong.encodeId)
  );

  const {
    title: songTitle = 'Never Gonna Give You Up',
    thumbnail = common.PLACEHOLDER,
    artists = [SAMPLE_ARTIST],
    duration = 150,
  } = currentSong;

  console.log('New render', { playingIndex, songTitle, currentTime });
  useEffect(() => {
    setCurrentTime(0);
  }, [playingIndex]);

  useEffect(() => {
    if (!audioRef.current || isFetchingMp3Url) return;

    if (isAppPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => audioRef.current.pause();
  }, [isAppPlaying, playingIndex, songMp3Url, isFetchingMp3Url]);

  // synchronize with outer uncontrolled system (audio) controller (play/pause button on your keyboard)
  // useEffect(() => {
  //   if (!audioRef.current.ended) {
  //     dispatch(setAppPlaying(isAudioPlaying.current));
  //   }
  // }, [isAudioPlaying.current]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  }, [seekTime]);

  const handleClickPlayButton = () => {
    dispatch(setAppPlaying(!isAppPlaying));
  };

  const handleSliderVolumeChange = (value) => {
    const newVolume = value / 100;
    setVolume(newVolume);
    localStorage.setItem(StorageKeys.VOLUME, JSON.stringify(newVolume));
    // dispatch(setVolume(value / 100));
  };

  const handleAudioTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleAudioEnded = () => {
    if (repeatMode === LOOP_MODE.LOOP_ONE) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      dispatch(setAppPlaying(true));
      return;
    }

    // setCurrentTime(0);
    dispatch(playNext());
  };

  const handleClickShuffle = () => {
    dispatch(setShuffle(!isShuffle));
  };

  const handleClickPlayBackward = () => {
    // setCurrentTime(0);
    dispatch(playPrevious());
  };

  const handleClickPlayForward = () => {
    // setCurrentTime(0);
    dispatch(playNext());
  };

  const handleClickLoopButton = () => {
    dispatch(cycleLoopMode());
  };

  const handleClickVolumeButton = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const audioElement = (
    <audio
      ref={audioRef}
      src={songMp3Url}
      onTimeUpdate={handleAudioTimeUpdate}
      onLoadedData={() => isAppPlaying && audioRef.current.play()}
      // onLoadedData={() => dispatch(setAppPlaying(true))}
      // onLoad={() => setCurrentTime(0)}
      onPlay={() => (isAudioPlaying.current = true)}
      onPause={() => (isAudioPlaying.current = false)}
      onEnded={handleAudioEnded}
    />
  );

  return (
    <div className="zm-player">
      <div className="zm-player__left">
        {/* should be a separate component (.media-list-item) */}
        <div className="media">
          <div className="media__thumbnail">
            <img src={thumbnail} alt={songTitle} />
          </div>

          <div className="media__content">
            <div className="media__name">
              <a href="#0" className="no-underline">
                {songTitle}
              </a>
            </div>
            <div className="media__author">{renderArtistsLinkText(artists)}</div>
          </div>

          <div className="media__actions">
            <button className="zm-button">
              <i className="fa-regular fa-heart"></i>
            </button>
            <button className="zm-button">
              <i className="fa-solid fa-ellipsis"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="zm-player__center">
        <div className="player-control">
          <div className="player-control__top">
            <div className="player-control__bar">
              <button
                className={clsx('zm-button zm-button-shuffle', { active: isShuffle })}
                onClick={handleClickShuffle}
              >
                {/* <i className="fa-solid fa-shuffle"></i> */}
                <ZmIcon className="ic-shuffle" />
              </button>
              <button className="zm-button" onClick={handleClickPlayBackward}>
                {/* <i className="fa-solid fa-backward-step"></i> */}
                <ZmIcon className="ic-pre" />
              </button>
              <button className="zm-button zm-button-play" onClick={handleClickPlayButton}>
                {/* if playing? show to-PAUSE :else show to-PLAY */}
                {isAppPlaying ? (
                  <ZmIcon className="ic-pause-circle-outline" />
                ) : (
                  /* pause->play */
                  <ZmIcon className="ic-play-circle-outline" />
                )}
              </button>
              <button className="zm-button" onClick={handleClickPlayForward}>
                {/* <i className="fa-solid fa-forward-step"></i> */}
                <ZmIcon className="ic-next" />
              </button>
              <button
                className={clsx('zm-button zm-button-repeat', { active: repeatMode !== LOOP_MODE.NO_LOOP })}
                onClick={handleClickLoopButton}
              >
                {/* <i className="fa-solid fa-arrows-rotate"></i> */}
                {LOOP_ICON[repeatMode]}
              </button>
            </div>
          </div>

          <div className="player-control__bottom">
            {audioElement}
            <div className="player-control__time time-left">{formatTime(currentTime)}</div>
            <div className="player-control__slider">
              <Slider
                value={currentTime}
                min={0}
                max={duration}
                step={1}
                onChange={setSeekTime}
                tipFormatter={formatTime}
              />
            </div>
            <div className="player-control__time time-right">{formatTime(duration)}</div>
          </div>
        </div>
      </div>

      <div className="zm-player__right">
        <div className="player-control__right">
          <button className="zm-button">
            {/* <i className="fa-solid fa-photo-film"></i> */}
            {/* <ZmIcon className="ic-mv" /> */}
            <ZmIcon className="ic-mv" style={{ fontSize: '20px' }} />
          </button>
          <button className="zm-button">
            {/* <i className="fa-solid fa-microphone-lines"></i> */}
            <ZmIcon className="ic-karaoke" />
          </button>
          <button className="zm-button">
            {/* <i className="fa-regular fa-window-restore"></i> */}
            <ZmIcon className="ic-restore" />
          </button>
          <div className="player-control__volume">
            <button className="zm-button" onClick={handleClickVolumeButton}>
              {volume === 0 || isMuted ? <ZmIcon className="ic-volume-mute" /> : <ZmIcon className="ic-volume" />}
            </button>
            <div className="volume-slider">
              <Slider
                value={isMuted ? 0 : volume * 100}
                min={0}
                max={100}
                step={1}
                onChange={handleSliderVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
