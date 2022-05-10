import ArtistList from '@/features/Artist/components/ArtistList';
import { SAMPLE_ARTIST } from '@/types';

export default function PersonalArtistList() {
  const artistList = Array(5).fill(SAMPLE_ARTIST);

  return <ArtistList authorList={artistList} />;
}
