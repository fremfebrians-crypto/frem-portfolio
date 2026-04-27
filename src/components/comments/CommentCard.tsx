import type { CommentItem } from '@/types/comment';

export default function CommentCard({ item }: { item: CommentItem }) {
  return (
    <article className="comment-card card">
      <div className="comment-author">
        <img className="comment-avatar" src={item.linkedinAvatar || '/images/placeholders/avatar-placeholder.png'} alt={item.linkedinName} />
        <div>
          <strong>{item.linkedinName}</strong>
          <span>{item.linkedinTitle || 'LinkedIn Member'}</span>
        </div>
      </div>
      <p>{item.message}</p>
    </article>
  );
}
