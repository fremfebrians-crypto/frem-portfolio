import AdminHeader from '@/components/admin/AdminHeader';
import CommentModerationTable from '@/components/admin/CommentModerationTable';
import { commentService } from '@/services/comment.service';

export default async function AdminCommentsPage() {
  const comments = await commentService.listAdmin();

  return (
    <div>
      <AdminHeader title="Comment Moderation" description="Approve, reject, or delete LinkedIn comments." />
      <CommentModerationTable initialItems={comments.map((item) => ({ ...item, createdAt: item.createdAt.toISOString() }))} />
    </div>
  );
}
