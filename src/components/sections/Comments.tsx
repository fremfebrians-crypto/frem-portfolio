import type { CommentItem } from '@/types/comment';
import CommentCarousel from '@/components/comments/CommentCarousel';

export default function Comments({ comments }: { comments: CommentItem[] }) {
  return (
    <div className="comments-wrap" id="comments">
      <div className="section-head">
        <div>
          <p className="section-breadcrumb">COMMENTS</p>
          <h2>Partner Kerja</h2>
        </div>
      </div>

      <CommentCarousel initialItems={comments} />
    </div>
  );
}