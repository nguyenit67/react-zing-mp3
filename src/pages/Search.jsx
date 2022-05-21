import { searchParamKeys } from '@/constants/pathKeys';
import { useSearchSongsQuery } from '@/features/queries';
import SongMediaList from '@/features/Song/components/SongMediaList';
import SongMediaSkeletonList from '@/features/Song/components/SongMediaSkeletonList';
import { subPageTitle } from '@/utils/urlUtils';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

const { QUERY_KEY } = searchParamKeys;

export default function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(QUERY_KEY);

  const fetchParams = { [QUERY_KEY]: keyword };
  const { data: songList, isLoading: isLoadingResult } = useSearchSongsQuery(fetchParams);

  const numberOfResults = songList?.length;

  console.log(songList);

  // if (!isLoading) {
  //   debugger;
  // }

  return (
    <div className="search-page">
      <Helmet>
        <title>{subPageTitle(`Tìm kiếm: ${keyword}`)}</title>
      </Helmet>

      <h3 className="zm-title">Từ Khóa tìm kiếm: {keyword}</h3>

      <div className="search-page__info-text">
        {isLoadingResult ? 'Đang tìm kiếm...' : `Có ${numberOfResults} kết quả tìm kiếm`}
      </div>

      {isLoadingResult ? (
        <SongMediaSkeletonList type="list" count={10} />
      ) : (
        <SongMediaList type="list" songList={songList} />
      )}
    </div>
  );
}
