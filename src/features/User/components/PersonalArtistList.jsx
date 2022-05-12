import ArtistList from '@/features/Artist/components/ArtistList';
import ArtistSkeletonList from '@/features/Artist/components/ArtistSkeletonList';
import { useSpotlightArtists } from '@/features/queries';

export default function PersonalArtistList() {
  const { data: artists, isLoading: isLoadingArtists } = useSpotlightArtists();

  console.log('PersonalArtistList', artists, isLoadingArtists);

  // debug only, delete when done
  // return <ArtistSkeletonList count={5} />;

  // @ts-ignore
  return isLoadingArtists ? <ArtistSkeletonList count={5} /> : <ArtistList artistList={artists} />;
}
