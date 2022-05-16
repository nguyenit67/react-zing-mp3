import Header from '@/components/Header';
import NavBar from '@/components/Navbar';
import PlayerBar from '@/components/PlayerBar';
import SidebarRight from '@/components/SidebarRight';
import { selectPlayerQueue } from '@/features/Song/reducers/selectors';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';

/**
 * @typedef {import('react-loading-skeleton').SkeletonThemeProps} SkeletonThemeProps
 *
 * @type {SkeletonThemeProps} */
export const globalSkeletonTheme = {
  baseColor: 'rgba(190, 190, 190, 0.2)',
  highlightColor: 'rgba(129,129,129,.24)',
};

export default function MusicAppLayout({ children }) {
  const { songList } = useSelector(selectPlayerQueue);

  return (
    <SkeletonTheme {...globalSkeletonTheme}>
      <div className="zm-layout darkmode">
        <div className="zm-layout__top">
          <div className="zm-layout__left">
            <NavBar />
          </div>

          <div className="zm-layout__center">
            <Header />
            <main className="main-content">{children}</main>
          </div>

          <div className="zm-layout__right">
            <SidebarRight />
          </div>
        </div>
        {songList.length > 0 && (
          <div className="zm-layout__bottom">
            <PlayerBar />
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
}
