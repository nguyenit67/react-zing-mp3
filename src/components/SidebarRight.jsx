import { useTop100ChartSongs } from '@/features/queries';
import SongMediaList from '@/features/Song/components/SongMediaList';
import SongMediaSkeletonList from '@/features/Song/components/SongMediaSkeletonList';
import { setSongs } from '@/features/Song/reducers/playerQueueSlice';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ZmIcon from './ZComponents/ZmIcon';
import ZmTabBar from './ZComponents/ZmTabBar';

const TABS = {
  PLAYLIST: 'playlist',
  RECENT: 'recent',
};

export default function SidebarRight() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(TABS.PLAYLIST);

  const { data: topSongList, isLoading: isLoadingPlaylistSongs } = useTop100ChartSongs();
  const recentSongs = [];

  useEffect(() => {
    // @ts-ignore
    if (topSongList && topSongList.length > 0) {
      dispatch(setSongs(topSongList));
    }
  }, [topSongList]);

  return (
    <div className="sidebar-right">
      <div className="sidebar-right__header">
        <div className="sidebar-right__tabs">
          <ZmTabBar
            activeTabKey={tab}
            onChange={setTab}
            tabs={[
              {
                key: TABS.PLAYLIST,
                title: 'Danh sách phát',
              },
              {
                key: TABS.RECENT,
                title: 'Nghe gần đây',
              },
            ]}
          />
        </div>
        <div className="sidebar-right__header-buttons">
          <button className="zm-button">
            {/* <i className="fa-solid fa-stopwatch"></i> */}
            <ZmIcon className="ic-20-Clock" />
          </button>
          <button className="zm-button">
            {/* <i className="fa-solid fa-ellipsis"></i> */}
            <ZmIcon className="ic-more" />
          </button>
        </div>
      </div>
      <div className="sidebar-right__content">
        {tab === TABS.PLAYLIST ? (
          renderInQueueSongs(topSongList, isLoadingPlaylistSongs)
        ) : recentSongs.length > 0 ? (
          <SongMediaList type="list" songList={recentSongs} />
        ) : (
          <div className="centered recent-empty">
            <button className="zm-button" onClick={() => setTab(TABS.PLAYLIST)}>
              <i className="fa-solid fa-play"></i>
              <span> Phát nhạc mới phát hành</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function renderInQueueSongs(songList, isLoading) {
  if (isLoading) {
    return <SongMediaSkeletonList type="list" count={12} />;
  }

  return (
    <SongMediaList
      type="list"
      // @ts-ignore
      songList={songList}
    />
  );
}

function renderRecentSongs(songList = []) {
  if (songList.length === 0) {
    return <Space></Space>;
  }
  return <SongMediaList type="list" songList={songList} />;
}
