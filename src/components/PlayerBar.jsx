import { common } from '@/constants';
import { formatTime } from '@/utils';
import { Divider, Slider } from 'antd';
import { formatCountdown, formatTimeStr } from 'antd/lib/statistic/utils';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * @param {{
 *  currentSong?: object;
 * }} _props
 */
export default function PlayerBar({ currentSong = {} }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);

  const {
    name: songName = 'Never Gonna Give You Up',
    thumbnailUrl = common.PLACEHOLDER,
    firstAuthor: { name: authorName = 'Rick Atsley' } = {},
    duration: totalTime = 150,
  } = currentSong;

  return (
    <div className="zm-player">
      <div className="zm-player__left">
        {/* should be a separate component */}
        <div className="media">
          <div className="media__thumbnail">
            <img src={thumbnailUrl} alt={songName} />
          </div>

          <div className="media__content">
            <div className="media__name">
              <a href="#0">{songName}</a>
            </div>
            <div className="media__author">
              <a href="#0">{authorName}</a>
            </div>
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
              <button className="zm-button">
                <i className="fa-solid fa-shuffle"></i>
              </button>
              <button className="zm-button">
                <i className="fa-solid fa-backward-step"></i>
              </button>
              <button className="zm-button zm-button-play">
                <i className="fa-solid fa-play"></i>
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
            <div className="player-control__time time-left">{formatTime(currentTime)}</div>
            <div className="player-control__slider">
              <Slider
                defaultValue={currentTime}
                min={0}
                max={totalTime}
                onChange={setCurrentTime}
                tipFormatter={formatTime}
              />
            </div>
            <div className="player-control__time time-right">{formatTime(totalTime)}</div>
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
              <Slider defaultValue={volume} onChange={setVolume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
