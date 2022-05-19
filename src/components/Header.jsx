import { pathKeys } from '@/constants';
import { searchParamKeys } from '@/constants/pathKeys';
import useNavigateSearch from '@/hooks/useNavigateSearch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SkinIcon from './Icons/SkinIcon';
import ZmIcon from './ZComponents/ZmIcon';

const { QUERY_KEY } = searchParamKeys;

export default function Header() {
  const [searchParams] = useSearchParams();
  const queryStr = searchParams.get(QUERY_KEY);

  const navigate = useNavigate();
  const searchNavigate = useNavigateSearch();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const params = {
        [QUERY_KEY]: event.target.value,
      };
      searchNavigate(pathKeys.SEARCH, params);
    }
  };

  const navGoBack = () => navigate(-1);
  const navGoForward = () => navigate(1);

  return (
    <div className="zm-header">
      <div className="zm-header__left">
        <button className="zm-button" onClick={navGoBack}>
          <ZmIcon className="ic-back" />
        </button>
        <button className="zm-button" onClick={navGoForward}>
          <ZmIcon className="ic-forward" />
        </button>
      </div>

      <div className="zm-header__center">
        <div className="zm-header__search">
          <ZmIcon className="ic-search" />
          <div className="zm-input-text">
            <input
              value={queryStr}
              type="search"
              className="zm-input-text__input"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>

      <div className="zm-header__right">
        <button className="zm-button">
          <i className="ic-zing-icon">
            <SkinIcon />
          </i>
        </button>
        <button className="zm-button">
          <ZmIcon className="ic-20-VIP-2" />
        </button>
        <button className="zm-button">
          <ZmIcon className="ic-upload" />
        </button>
        <button className="zm-button">
          <ZmIcon className="ic-settings" />
        </button>
        <button className="zm-button">
          {/* <ZmIcon className="ic-user" /> */}
          <figure style={{ margin: '0' }}>
            <img className="border-round" src="https://avatar.talk.zdn.vn/default.jpg" alt="" />
          </figure>
        </button>
      </div>
    </div>
  );
}
