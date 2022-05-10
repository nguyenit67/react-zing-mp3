import searchApi from '@/api/searchApi';
import { searchParamKeys } from '@/constants/pathKeys';
import SongMediaList from '@/features/Song/components/SongMediaList';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';
import { subPageTitle } from '@/utils/urlUtils';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const { QUERY_KEY } = searchParamKeys;

export default function Search() {
  const [searchParams] = useSearchParams();
  const queryStr = searchParams.get(QUERY_KEY);

  const fetchParams = { [QUERY_KEY]: queryStr };

  const {
    data: searchData,
    isLoading,
    isError,
  } = useQuery(['search', fetchParams], () => searchApi.searchAll(fetchParams));

  const songResultList = useMemo(() => {
    return getRandomSongs(500);
  }, [QUERY_KEY, queryStr, searchData]);

  if (isError) {
  }

  if (isLoading) {
    return <>bruh</>;
  }

  const numberOfResults = songResultList.length;

  return (
    <div className="search-page">
      <Helmet>
        <title>{subPageTitle(`Tìm kiếm: ${queryStr}`)}</title>
      </Helmet>

      <h3 className="zm-title">Từ Khóa tìm kiếm: {queryStr}</h3>

      <div className="search-page__info-text">Có {numberOfResults} kết quả tìm kiếm</div>

      <SongMediaList type="list" songList={songResultList} />
    </div>
  );
}
