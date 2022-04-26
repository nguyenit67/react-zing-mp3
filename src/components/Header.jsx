export default function Header() {
  return (
    <div className="zm-header">
      <div className="zm-header__left">
        <button className="zm-button">
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <button className="zm-button">
          <i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>

      <div className="zm-header__center">
        <div className="zm-header__search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <div className="zm-input-text">
            <input type="text" className="zm-input-text__input" placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..." />
          </div>
        </div>
      </div>

      <div className="zm-header__right">
        <button className="zm-button">
          <i className="fa-solid fa-circle-half-stroke"></i>
        </button>
        <button className="zm-button">
          <i className="fa-solid fa-trophy"></i>
        </button>
        <button className="zm-button">
          <i className="fa-solid fa-upload"></i>
        </button>
        <button className="zm-button">
          <i className="fa-solid fa-gear"></i>
        </button>
        <button className="zm-button">
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
    </div>
  );
}
