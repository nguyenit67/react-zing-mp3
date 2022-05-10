const pathKeys = {
  PERSONAL: '/mymusic',
  ZINGCHART: '/chart',
  RADIO: '/radio',
  FOLLOW: '/theo-doi',
  LATEST_SONGS: '/nhac-moi',
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
