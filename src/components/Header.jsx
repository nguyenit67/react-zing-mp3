import { pathKeys } from '@/constants';
import useNavigateSearch from '@/hooks/useNavigateSearch';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const searchNavigate = useNavigateSearch();

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      searchNavigate(pathKeys.SEARCH, {
        q: event.target.value,
      });
    }
  };

  const navGoBack = () => navigate(-1);
  const navGoForward = () => navigate(1);

  return (
    <div className="zm-header">
      <div className="zm-header__left">
        <button className="zm-button" onClick={navGoBack}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <button className="zm-button" onClick={navGoForward}>
          <i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>

      <div className="zm-header__center">
        <div className="zm-header__search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <div className="zm-input-text">
            <input
              type="search"
              className="zm-input-text__input"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
              onKeyUp={handleKeyUp}
            />
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
