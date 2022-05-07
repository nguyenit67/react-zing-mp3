import SongMediaList from '@/features/Song/components/SongMediaList';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
  const [searchParams] = useSearchParams();
  const keySearch = searchParams.get('q');

  const songResultList = getRandomSongs(500);

  const numberOfResults = songResultList.length;

  return (
    <div className="search-page">
      <h3 className="zm-title">Từ Khóa tìm kiếm: {keySearch}</h3>

      <div className="search-page__info-text">Có {numberOfResults} kết quả tìm kiếm</div>

      <SongMediaList type="list" songList={songResultList} />
    </div>
  );
}
