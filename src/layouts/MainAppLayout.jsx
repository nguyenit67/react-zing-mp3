import Header from '@/components/Header';
import NavBar from '@/components/Navbar';
import PlayerBar from '@/components/PlayerBar';
import SidebarRight from '@/components/SidebarRight';

export default function MusicAppLayout({ children }) {
  return (
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
  );
}
