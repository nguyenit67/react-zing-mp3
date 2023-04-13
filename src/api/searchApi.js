import { searchParamKeys } from '@/constants/pathKeys';
import axiosClient from './axiosClient';
import { API_FULL_SONG_SEARCH } from '@/config';

const { QUERY_KEY, LIMIT_KEY, PAGE_KEY } = searchParamKeys;

const searchApi = {
  searchSongs(params) {
    const url = API_FULL_SONG_SEARCH + '/search-songs';

    const fetchParams = {
      keyword: params[QUERY_KEY],
      page: params[PAGE_KEY] ?? 1,
      count: params[LIMIT_KEY] ?? 500,
    };

    return axiosClient.get(url, { params: fetchParams });
  },
};

export default searchApi;
