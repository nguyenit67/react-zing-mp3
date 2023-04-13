import searchApi from '@/api/searchApi';
import songApi from '@/api/songApi';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

/**
 * @typedef {import('@/types').Artist} Artist
 * @returns {Artist[]}
 */
export function transformHomeToArtists({ data }) {
  console.log({ home_data: data });
  const artistsSection = data?.items?.find((item) => item.sectionId === 'hArtistTheme' && item.viewType === 'slider');

  const artistList = artistsSection?.items?.map((item) => item?.artists[0]);
  return artistList ?? [];
}
// export function transformHomeToArtists({ data }) { // old data structure
//   console.log({ home_data: data });
//   const artistsSection = data?.items?.find(
//     (item) => item.sectionType === 'artistSpotlight' && item.viewType === 'slider'
//   );

//   const artistList = artistsSection?.items;
//   return artistList ?? [];
// }

// export const getSongSections = ({ data }) => {
export const transformHomeSongSections = ({ data }) => {
  const { newRelease, weekChart } = data;

  const { vn: vietnamSongs, us: usUKSongs, korea: kpopSongs } = weekChart;

  const sections = [
    {
      title: 'Nhạc Mới Mỗi Ngày',
      items: newRelease.slice(0, 5),
    },
    {
      title: 'Nhạc Mới Mỗi Ngày',
      items: newRelease.slice(5, 10),
    },
    {
      title: 'Top Bài Hát Việt',
      items: vietnamSongs.items.slice(0, 5),
    },
    {
      title: 'Top Bài Hát US-UK',
      ...usUKSongs,
    },
    {
      title: 'Top Bài Hát K-Pop',
      ...kpopSongs,
    },
  ];

  const shortenSections = sections.map(({ items, ...rest }) => ({
    ...rest,
    items: items.slice(0, 10),
  }));

  return shortenSections;
};

const transformSongSearchToSongList = ({ data }) => {
  const { items } = data;
  return items;
};

export const useSearchSongsQuery = (fetchParams) =>
  useQuery(['searchSongs', fetchParams], () => searchApi.searchSongs(fetchParams), {
    select: transformSongSearchToSongList,
  });

const getTop100ChartSongs = ({ data }) => {
  const { RTChart: rtChart } = data;
  return rtChart.items;
};

export const useTop100ChartSongs = () => useChartHomeQuery(getTop100ChartSongs);

export const useHomeQuery = ({ page }, select) =>
  useQuery(['home', { page }], () => songApi.getHome({ page }), { select });

export const useChartHomeQuery = (select) => useQuery(['chartHome'], () => songApi.getChartHome(), { select });

const PAGE_WITH_ARTIST_ALBUMS = 2;
export const useSpotlightArtists = () => useHomeQuery({ page: 1 }, transformHomeToArtists);

export const useSongMp3 = (songId, condition = true) =>
  useQuery(['songMp3', songId], () => songApi.getMp3(songId), {
    // @ts-ignore
    select: ({ data, msg: errorMsg }) => {
      if (!data) {
        toast(errorMsg, { type: 'error' });
        return '';
      }
      return data['128'];
    },
    enabled: condition,
    onError: (err) => {
      // @ts-ignore
      toast(err.message, { type: 'error' });
    },
  });
