import ZMediaCarousel from '@/components/ZComponents/ZMediaCarousel';
import SongMediaList from '@/features/Song/components/SongMediaList';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';
import { Col, Row } from 'antd';
import { nanoid } from 'nanoid';

function createSongSliderItem(imageUrl) {
  return {
    id: nanoid(),
    data: {
      thumbnailUrl: imageUrl,
    },
  };
}

export default function PersonalOverview(props) {
  const randomSongSliderList = [
    createSongSliderItem('https://i.scdn.co/image/ab6761610000e5eb2d530c07b6c9f629e3327175'),
    createSongSliderItem('https://i.scdn.co/image/ab6761610000e5eb2af8bbb74cb106ac91d31c9a'),
    createSongSliderItem('https://i.scdn.co/image/ab6761610000e5eb33b1cf2b7b544840b727865b'),
    createSongSliderItem('https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576'),
    createSongSliderItem('https://i.scdn.co/image/ab6761610000e5eb37db62ee361f796bef5b49a6'),
    createSongSliderItem('https://i.scdn.co/image/ab6761610000e5eb2aa26cfdf3b785f171a4795c'),
    createSongSliderItem('https://i.scdn.co/image/ab6761610000e5eb015af0621865cd5cd5046c2c'),
  ];

  return (
    <div className="personal-page__overview">
      <Row style={{ marginBottom: '50px' }}>
        <Col span={24} className="zm-column">
          <h3 className="zm-title">Bài hát</h3>
        </Col>

        <Col span={8} className="zm-column">
          <ZMediaCarousel
            type="overlap"
            dataSource={randomSongSliderList}
            renderItem={(item) => <img src={item.thumbnailUrl} alt="" />}
          />
        </Col>
        <Col span={16} className="zm-column">
          <SongMediaList songList={getRandomSongs(5)} type="list" className="personal-page__overview__media-list" />
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
