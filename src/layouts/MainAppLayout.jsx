import Header from '@/components/Header';
import NavBar from '@/components/Navbar';
import PlayerBar from '@/components/PlayerBar';
import SidebarRight from '@/components/SidebarRight';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MusicAppLayout({ children }) {
  return (
    <SkeletonTheme baseColor="rgba(190, 190, 190, 0.2)" highlightColor="rgba(129,129,129,.24)" borderRadius="0.5rem">
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

        <div className="zm-layout__bottom">
          <PlayerBar />
        </div>
      </div>
    </SkeletonTheme>
  );
}
