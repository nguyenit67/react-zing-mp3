import StorageKeys from '@/constants/storage-keys';
import { useTop100ChartSongs } from '@/features/queries';
import SongMediaList from '@/features/Song/components/SongMediaList';
import SongMediaSkeletonList from '@/features/Song/components/SongMediaSkeletonList';
import { setSongs } from '@/features/Song/reducers/playerQueueSlice';
import { selectPlayerQueueList, selectRecentSongList } from '@/features/Song/reducers/selectors';
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ZmIcon from './ZComponents/ZmIcon';
import ZmTabBar from './ZComponents/ZmTabBar';

const TABS = {
  PLAYLIST: 'playlist',
  RECENT: 'recent',
};

export default function SidebarRight() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(TABS.PLAYLIST);

  const queueSongList = useSelector(selectPlayerQueueList);
  const recentSongs = useSelector(selectRecentSongList);

  useEffect(() => {
    localStorage.setItem(StorageKeys.RECENT_SONGS, JSON.stringify(recentSongs));
  }, [recentSongs]);

  const { data: topSongList, isLoading: isLoadingPlaylistSongs } = useTop100ChartSongs();
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
            <ZmIcon className="ic-20-Clock" />
          </button>
          <button className="zm-button">
            <ZmIcon className="ic-more" />
          </button>
        </div>
      </div>
      <div className="sidebar-right__content">
        {tab === TABS.PLAYLIST ? (
          renderInQueueSongs(queueSongList, isLoadingPlaylistSongs)
        ) : recentSongs.length > 0 ? (
          <SongMediaList type="list" songList={recentSongs} />
        ) : (
          <div className="recent-empty">
            <div className="content">Khám phá thêm các bài hát mới của Zing MP3</div>
            <button className="zm-button" onClick={() => setTab(TABS.PLAYLIST)}>
              {/* <i className="fa-solid fa-play"></i> */}
              <ZmIcon className="ic-play" />
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
