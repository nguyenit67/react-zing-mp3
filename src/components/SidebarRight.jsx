import SongMediaList from '@/features/Song/components/SongMediaList';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';
import { useState } from 'react';
import ZmTabBar from './ZComponents/ZmTabBar';

export default function SidebarRight() {
  const [tab, setTab] = useState('1');

  // MOCKING DATA
  const songList = tab === '1' ? [...Array(20)] : [{}];
  songList[2] = { isFavorite: true };
  songList[3] = { isActive: true, isFavorite: true };
  songList[4] = { isFavorite: true };
  songList[10] = { songName: 'On & On (feat. Daniel Levi) [NCS Release]' };

  return (
    <div className="sidebar-right">
      <div className="sidebar-right__header">
        <div className="sidebar-right__tabs">
          <ZmTabBar
            tabs={[
              {
                key: '1',
                title: 'Danh sách phát',
              },
              {
                key: '2',
                title: 'Nghe gần đây',
              },
            ]}
            onChange={setTab}
          />
        </div>
        <div className="sidebar-right__header-buttons">
          <button className="zm-button">
            <i className="fa-solid fa-stopwatch"></i>
          </button>
          <button className="zm-button">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>
      <div className="sidebar-right__content">
        <SongMediaList type="list" songList={getRandomSongs(5)} />
      </div>
    </div>
  );
}
