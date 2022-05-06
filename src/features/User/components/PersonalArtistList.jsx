import AuthorItem from '@/features/Author/components/AuthorItem';
import { SAMPLE_AUTHOR } from '@/types';

export default function PersonalAuthorList() {
  return (
    <div className="author-list">
      {Array.from(Array(5)).map(() => (
        <AuthorItem author={SAMPLE_AUTHOR} />
      ))}
    </div>
  );
}
