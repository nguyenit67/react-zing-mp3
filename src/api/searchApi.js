import { searchParamKeys } from '@/constants/pathKeys';
import axiosClient from './axiosClient';

const { QUERY_KEY, LIMIT_KEY, PAGE_KEY } = searchParamKeys;

const SEARCH_FULL_SONGS_BASEURL = 'https://aqueous-citadel-07678.herokuapp.com';

const searchApi = {
  searchSongs(params) {
    const url = SEARCH_FULL_SONGS_BASEURL + '/search-songs';

    const fetchParams = {
      keyword: params[QUERY_KEY],
      page: params[PAGE_KEY] ?? 1,
      count: params[LIMIT_KEY] ?? 500,
    };

    return axiosClient.get(url, { params: fetchParams });
  },
};

export default searchApi;
