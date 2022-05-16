import { common } from '@/constants';
import { useSongMp3 } from '@/features/queries';
import { playNext, playPrevious, setAppPlaying, setShuffle, setVolume } from '@/features/Song/reducers/playerQueueSlice';
import { selectPlayerQueue } from '@/features/Song/reducers/selectors';
import renderArtistsLinkText from '@/features/Song/utils/renderArtistsLinkText';
import { SAMPLE_ARTIST } from '@/types';
import { formatTime } from '@/utils';
import { Slider } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @typedef {import('@/types').Song} Song
 * @typedef {import('@/features/Song/reducers/playerQueueSlice').PlayerQueueSliceState} PlayerQueueSliceState
 */

export default function PlayerBar() {
  const dispatch = useDispatch();
  /**
   * @type {React.MutableRefObject<HTMLAudioElement>} */
  const audioRef = useRef();

  /** @type {PlayerQueueSliceState}  */
  const playerQueue = useSelector(selectPlayerQueue);
  const { songList, currentIndex, isAppPlaying, volume } = playerQueue;

  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const isAudioPlaying = useRef(false);

  /** @type {Song} */
  // @ts-ignore
  const currentSong = songList[currentIndex] ?? {};

  // const hasSongInPlayer = songList.length > 0;
  const { data: songMp3Url, isLoading: isFetchingMp3Url } = useSongMp3(
    currentSong.encodeId,
    currentSong.encodeId !== undefined
  );

  const {
    title: songTitle = 'Never Gonna Give You Up',
    thumbnail = common.PLACEHOLDER,
    artists = [SAMPLE_ARTIST],
    duration = 150,
  } = currentSong;

  const handleClickPlayButton = () => {
    dispatch(setAppPlaying(!isAppPlaying));
  };

  useEffect(() => {
    if (!audioRef.current || isFetchingMp3Url) return;

    if (isAppPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => audioRef.current.pause();
  }, [isAppPlaying, currentSong, songMp3Url, isFetchingMp3Url]);

  // synchronize with outer uncontrolled system (audio) controller (play/pause button on your keyboard)
  useEffect(() => {
    dispatch(setAppPlaying(isAudioPlaying.current));
  }, [isAudioPlaying.current]);

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

  const handleVolumeSliderChange = (value) => {
    dispatch(setVolume(value / 100));
  };

  const handleAudioTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleAudioEnded = () => {
    // dispatch(setAppPlaying(false));
  }

  const handleClickShuffle = () => {
    dispatch(setShuffle(!playerQueue.isShuffle));

  const handleClickBackward = () => {
    dispatch(playPrevious());
  }

  const handleClickForward = () => {
    dispatch(playNext());
  }

  const audioElement = (
    <audio
      ref={audioRef}
      src={songMp3Url}
      onTimeUpdate={handleAudioTimeUpdate}
      onLoadedData={() => isAppPlaying && audioRef.current.play()}
      // onLoad={() => setCurrentTime(0)}
      onPlay={() => (isAudioPlaying.current = true)}
      onPause={() => (isAudioPlaying.current = false)}
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
              <a href="#0">{songTitle}</a>
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
              <button className="zm-button" onClick={}>
                <i className="fa-solid fa-shuffle"></i>
              </button>
              <button className="zm-button">
                <i className="fa-solid fa-backward-step"></i>
              </button>
              <button className="zm-button zm-button-play" onClick={handleClickPlayButton}>
                {isAppPlaying ? (
                  /* play->pause */
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  /* pause->play */
                  <i className="fa-solid fa-play"></i>
                )}
              </button>
              <button className="zm-button">
                <i className="fa-solid fa-forward-step"></i>
              </button>
              <button className="zm-button">
                <i className="fa-solid fa-arrows-rotate"></i>
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
            <i className="fa-solid fa-photo-film"></i>
          </button>
          <button className="zm-button">
            <i className="fa-solid fa-microphone-lines"></i>
          </button>
          <button className="zm-button">
            <i className="fa-regular fa-window-restore"></i>
          </button>
          <div className="player-control__volume">
            <button className="zm-button">
              {volume === 0 ? (
                <i className="fa-solid fa-volume-xmark"></i>
              ) : volume < 50 ? (
                <i className="fa-solid fa-volume-low"></i>
              ) : (
                <i className="fa-solid fa-volume-high"></i>
              )}
            </button>
            <div className="volume-slider">
              <Slider defaultValue={volume * 100} min={0} max={100} step={1} onChange={handleVolumeSliderChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
