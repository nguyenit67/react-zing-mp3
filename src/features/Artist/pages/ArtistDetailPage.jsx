import artistApi, { transformToArtist } from '@/api/artistApi';
import SongMediaList from '@/features/Song/components/SongMediaList';
import SongMediaSkeletonList from '@/features/Song/components/SongMediaSkeletonList';
import ZmSkeletonTheme from '@/layouts/ZmSkeletonTheme';
import { Col, Row } from 'antd';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export default function ArtistDetailPage() {
  const { artistId } = useParams();
  const navigate = useNavigate();

  const [isLoadedThumbnail, setIsLoadedThumbnail] = useState(false);

  const {
    data: artist,
    isLoading: isLoadingArtist,
    isError,
  } = useQuery(['artist', artistId], () => artistApi.getDetail(artistId), {
    select: transformToArtist,
  });

  if (isError) {
    navigate('/');
  }

  // for debug only, delete these 2 lines when finish
  // let isLoadingArtist = !artist;
  // isLoadingArtist = true;

  if (isLoadingArtist) {
    return (
      <ZmSkeletonTheme borderRadius={0}>
        <div className="artist-detail-page">
          <Row>
            <Col xs={8} className="zm-column">
              <Skeleton width="100%" className="avatar-thumbnail-placeholder" style={{ marginBottom: '14px' }} />
              <Skeleton height={15} count={2} />
            </Col>
            <Col xs={16} className="zm-column">
              <Skeleton width={200} height={15} style={{ marginBottom: '20px' }} />
              <SongMediaSkeletonList type="list" />
            </Col>
          </Row>
        </div>
      </ZmSkeletonTheme>
    );
  }

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
            {!isLoadedThumbnail && <Skeleton className="avatar-thumbnail-placeholder" />}
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
