import artistApi, { transformToArtist } from '@/api/artistApi';
import SongMediaList from '@/features/Song/components/SongMediaList';
import { Col, Row, Skeleton } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export default function ArtistDetailPage() {
  const { artistId } = useParams();
  const navigate = useNavigate();

  const [isLoadedThumbnail, setIsLoadedThumbnail] = useState(false);

  const {
    data: artist,
    isLoading,
    isError,
  } = useQuery(['artist', artistId], () => artistApi.getDetail(artistId), {
    select: transformToArtist,
  });

  if (isError) {
    navigate('/');
  }

  if (isLoading) {
    return (
      <div className="artist-detail-page">
        <Row>
          <Col xs={8} className="zm-column">
            <Skeleton active avatar={{ shape: 'square' }} className="avatar-thumbnail-placeholder" />
            <Skeleton active title />
          </Col>
          <Col xs={16} className="zm-column">
            <Skeleton active title paragraph={{ rows: 0 }} />
            <SongMediaList type="list" loading />
          </Col>
        </Row>
      </div>
    );
  }

  console.log('ArtistDetailPage', artist);

  const {
    thumbnail: avatarUrl = 'https://i.scdn.co/image/ab6761610000e5ebaad54b2cf9044587eac7acdf',
    name: artistName = 'Justin Bieber',
    songList,
  } = artist;

  const handleThumbnailLoad = () => {
    setIsLoadedThumbnail(true);
  };

  const thumbnailStyle = isLoadedThumbnail ? {} : { display: 'none' };

  return (
    <div className="artist-detail-page">
      <Row>
        <Col xs={8} className="zm-column">
          <figure>
            {!isLoadedThumbnail && (
              <Skeleton active avatar={{ shape: 'square' }} className="avatar-thumbnail-placeholder" />
            )}
            <img
              src={avatarUrl}
              alt={artistName}
              style={thumbnailStyle}
              onLoad={handleThumbnailLoad}
              // loading="lazy"
            />
          </figure>
          <h3 className="zm-title">{artistName}</h3>
        </Col>
        <Col xs={16} className="zm-column">
          <h3 className="zm-title">Bài hát nổi bật</h3>
          <SongMediaList type="list" songList={songList} />
        </Col>
      </Row>
    </div>
  );
}
