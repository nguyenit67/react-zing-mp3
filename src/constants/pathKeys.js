const pathKeys = {
  ROOT: '/',
  PERSONAL: '/mymusic',
  ZING_CHART: '/chart',
  RADIO: '/radio',
  FOLLOW: '/theo-doi',
  LATEST_SONGS: '/nhac-moi',
  GENRE: '/the-loai',
  TOP100: '/top100',
  MV: '/mv',

  SEARCH: '/tim-kiem',
  ARTIST: '/artist',
};

export default pathKeys;

/**
 * @description the ones prepend with ':' like 'postId' -> '.../:postId'
 **/
export const pathParamKeys = {
  ARTIST_ID: 'artistId',
};

export const searchParamKeys = {
  QUERY_KEY: 'keyword',
  LIMIT_KEY: 'limit',
  TYPE_KEY: 'type',
};
