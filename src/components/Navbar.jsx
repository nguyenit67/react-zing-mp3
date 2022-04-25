import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
// @ts-ignore

function NavBar() {
  const primaryList = [
    {
      title: 'Cá nhân',
      renderIcon: <i className="fa-solid fa-headphones"></i>,
    },
    {
      title: 'Khám Phá',
      renderIcon: <i className="fa-solid fa-compact-disc"></i>,
    },
    {
      title: '#zingchart',
      renderIcon: <i className="fa-solid fa-chart-line"></i>,
    },
    {
      title: 'Radio',
      renderIcon: <i className="fa-solid fa-podcast"></i>,
    },
    {
      title: 'Theo dõi',
      renderIcon: <i className="fa-solid fa-newspaper"></i>,
    },
  ];

  const secondList = [
    {
      title: 'Nhạc mới',
      renderIcon: <i className="fa-solid fa-music"></i>,
    },
    {
      title: 'Thể loại',
      renderIcon: <i className="fa-solid fa-guitar"></i>,
    },
    {
      title: 'Top 100',
      renderIcon: <i className="fa-solid fa-star"></i>,
    },
    {
      title: 'Music Video',
      renderIcon: <i className="fa-brands fa-youtube"></i>,
    },
  ];

  const renderList = (list) => (
    <div className="menu__list">
      {list.map((item, index) => (
        <div key={index} className="menu__item">
          <RouterLink to={item.href || ''} className="navbar__link">
            {item.renderIcon}
            <span className="navbar__link-text">{item.title}</span>
            {item.append}
          </RouterLink>
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
          <span className="logo-letter--k">w</span>
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
          <i className="fa-solid fa-plus"></i>
          <span className="navbar__button-text">Tạo playlist mới</span>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
