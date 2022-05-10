// import { searchParamKeys } from '@/constants/pathKeys';
// import axiosClient from './axiosClient';

// const { QUERY_KEY, LIMIT_KEY, TYPE_KEY } = searchParamKeys;

// const searchApi = {
//   searchAll(params) {
//     const url = 'https://ac.mp3.zing.vn/complete';

//     const apiParams = {
//       query: params[QUERY_KEY],
//       num: params[LIMIT_KEY] ?? 500,
//       type: params[TYPE_KEY] ?? 'artist,song,key,code',
//     };

//     return axiosClient.get(url, { params: apiParams });
//   },
// };

// // @ts-ignore
// searchApi.searchAll.transformToSongs = ({ data: serverData }) => {
//   const rawSongs = serverData.find((entry) => entry.hasOwnProperty('song'));
//   const rawArtists = serverData.find((entry) => entry.hasOwnProperty('artist'));

//   const derivedData = {
//     songList: rawSongs,
//     artistList: rawArtists,
//   };

//   console.log(derivedData);

//   return derivedData;
// };

// export default searchApi;
export default {};
