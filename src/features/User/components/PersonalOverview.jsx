import ZMediaCarousel, { createSlideList } from '@/components/ZComponents/ZMediaCarousel';
import { useSpotlightArtists } from '@/features/queries';
import SongMediaList from '@/features/Song/components/SongMediaList';
import { useFavoriteSongs } from '@/features/Song/context/FavoriteSongsContext';
import { Col, Row } from 'antd';
import { nanoid } from 'nanoid';
import Skeleton from 'react-loading-skeleton';

function createSongSliderItem(imageUrl) {
  return {
    id: nanoid(),
    data: {
      thumbnailUrl: imageUrl,
    },
  };
}

export default function PersonalOverview(props) {
  const { favoriteSongs } = useFavoriteSongs();

  const { data: artists, isLoading: isLoadingArtists, isError } = useSpotlightArtists();

  return (
    <div className="personal-page__overview">
      <Row style={{ marginBottom: '50px' }}>
        <Col span={24} className="zm-column">
          <h3 className="zm-title">Bài hát</h3>
        </Col>

        <Col span={8} className="zm-column">
          {isLoadingArtists ? (
            <ZMediaCarousel
              type="overlap"
              // @ts-ignore
              dataSource={createSlideList([...Array(2)])}
              autoPlay={false}
              renderItem={() => <Skeleton width={230} height={230} />}
            />
          ) : (
            <ZMediaCarousel
              type="overlap"
              // @ts-ignore
              dataSource={createSlideList(artists)}
              renderItem={(item) => <img src={item.thumbnail} alt="" />}
            />
          )}
        </Col>
        <Col span={16} className="zm-column">
          <SongMediaList songList={favoriteSongs} type="list" className="personal-page__overview__media-list" />
        </Col>
      </Row>
      <Row style={{ marginBottom: '50px' }}>
        <Col span={24} className="zm-column">
          <h3 className="zm-title">Play list</h3>
        </Col>
      </Row>
    </div>
  );
}
