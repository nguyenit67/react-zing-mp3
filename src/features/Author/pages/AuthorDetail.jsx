import SongMediaList from '@/features/Song/components/SongMediaList';
import getRandomSongs from '@/features/Song/utils/getRandomSongs';
import { randomIntBetween } from '@/utils';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';

export default function AuthorDetail() {
  const { authorId } = useParams();

  const author = {}; // load from author

  const {
    thumbnailUrl = 'https://i.scdn.co/image/ab6761610000e5ebaad54b2cf9044587eac7acdf',
    name: authorName = 'Justin Bieber',
  } = author;

  return (
    <div className="author-detail-page">
      <Row>
        <Col xs={8} className="zm-column">
          <figure>
            <img src={thumbnailUrl} alt={authorName} />
          </figure>
          <h3 className="author-name zm-title">{authorName}</h3>
        </Col>
        <Col xs={16} className="zm-column">
          <h3 className="zm-title">Bài hát</h3>
          <SongMediaList type="list" songList={getRandomSongs(randomIntBetween(1, 40))} />
        </Col>
      </Row>
    </div>
  );
}
