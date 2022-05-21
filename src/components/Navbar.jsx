import { pathKeys } from '@/constants';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import ZmIcon from './ZComponents/ZmIcon';
// @ts-ignore

function NavBar() {
  const primaryList = [
    {
      title: 'Cá nhân',
      href: pathKeys.PERSONAL,
      renderIcon: <ZmIcon className="ic-24-LibraryTab" />,
    },
    {
      title: 'Khám Phá',
      href: pathKeys.ROOT,
      renderIcon: <ZmIcon className="ic-24-HomeTab" />,
    },
    {
      title: '#zingchart',
      href: pathKeys.ZING_CHART,
      renderIcon: <ZmIcon className="ic-24-ChartTab" />,
    },
    {
      href: pathKeys.RADIO,
      title: 'Radio',
      renderIcon: <ZmIcon className="ic-24-RadioTab" />,
    },
    {
      href: pathKeys.FOLLOW,
      title: 'Theo dõi',
      renderIcon: <ZmIcon className="ic-24-FeedTab" />,
    },
  ];

  const secondList = [
    {
      href: pathKeys.LATEST_SONGS,
      title: 'Nhạc mới',
      renderIcon: <ZmIcon className="ic-24-NewReleaseTab" />,
    },
    {
      href: pathKeys.GENRE,
      title: 'Thể loại',
      renderIcon: <ZmIcon className="ic-24-GenreTab" />,
    },
    {
      href: pathKeys.TOP100,
      title: 'Top 100',
      renderIcon: <ZmIcon className="ic-24-Top100Tab" />,
    },
    {
      href: pathKeys.MV,
      title: 'Music Video',
      renderIcon: <ZmIcon className="ic-24-MVTab" />,
    },
  ];

  const renderList = (list) => (
    <div className="menu__list">
      {list.map((item, index) => (
        <div key={index} className="menu__item">
          <NavLink to={item.href || '#0'} className={({ isActive }) => clsx('navbar__link', { active: isActive })}>
            {item.renderIcon}
            <span className="navbar__link-text">{item.title}</span>
            {item.append}
          </NavLink>
        </div>
      ))}
    </div>
  );

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <div className="letters-logo">
          <span className="logo-letter--N">N</span>
          <span className="logo-letter--o">o</span>
          <span className="logo-letter--k">v</span>
          <span className="logo-letter--i">a</span>
          {/* <span className="logo-letter--i">i</span> */}
          <span className="logo-letter--normal">mp3</span>
        </div>

        <div className="navbar__logo-image"></div>
      </div>

      <div className="navbar__main-menu">{renderList(primaryList)}</div>
      <hr className="navbar__menu-divider" />

      <div className="navbar__sub-menu">{renderList(secondList)}</div>

      <div className="navbar__bottom">
        <button className="zm-button">
          {/* <i className="fa-solid fa-plus"></i> */}
          <ZmIcon className="ic-add" />
          <span className="navbar__button-text">Tạo playlist mới</span>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
