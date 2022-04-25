import clsx from 'clsx';
// @ts-ignore

function NavBar() {
  const list1 = [
    {
      title: 'Cá nhân',
      iconClassName: 'ic-zm-Library',
    },
    {
      title: 'Khám Phá',
      iconClassName: 'ic-zm-Disk',
    },
    {
      title: '#zingchart',
      iconClassName: 'ic-zm-ZChart',
    },
    {
      title: 'Radio',
      iconClassName: 'ic-zm-Radio',
    },
    {
      title: 'Cá nhân',
      iconClassName: 'ic-zm-Feed',
    },
  ];

  const list2 = [
    {
      title: 'Nhạc mới',
      iconClassName: 'ic-zm-Library',
    },
    {
      title: 'Thể loại',
      iconClassName: 'ic-zm-Disk',
    },
    {
      title: 'Top 100',
      iconClassName: 'ic-zm-ZChart',
    },
    {
      title: 'Music Video',
      iconClassName: 'ic-zm-Radio',
    },
  ];

  return (
    <aside className="zm-navbar">
      <div className="zm-navbar__logo">
        <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt="Zing MP3 logo" />
      </div>

      <nav>
        <ul className="list-none">
          {list1.map((item, index) => (
            <li key={index}>
              <i className={item.iconClassName}></i>
              <span>{item.title}</span>
              {item.append}
            </li>
          ))}
        </ul>

        <hr />

        <ul className="list-none">
          {list2.map((item, index) => (
            <li key={index}>
              <i className={item.iconClassName}></i>
              <span>{item.title}</span>
              {item.append}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default NavBar;
