import { NextRequest, NextResponse } from 'next/server';
import { commentService } from '@/services/comment.service';
import { getLinkedinSession } from '@/lib/auth-linkedin';

export async function GET() {
  const comments = await commentService.listPublic();
  return NextResponse.json({ comments: comments.map((item) => ({ ...item, createdAt: item.createdAt.toISOString() })) });
}

export async function POST(request: NextRequest) {
  const user = await getLinkedinSession();
  if (!user) {
    return NextResponse.json({ error: 'Please sign in with LinkedIn first.' }, { status: 401 });
  }

  const body = await request.json();
  const message = String(body.message || '').trim();
  if (message.length < 10) {
    return NextResponse.json({ error: 'Comment is too short.' }, { status: 400 });
  }

  const comment = await commentService.create({
    linkedinId: user.sub,
    linkedinName: user.name,
    linkedinEmail: user.email || '',
    linkedinAvatar: user.picture || '',
    linkedinTitle: user.title || '',
    linkedinUrl: user.profile || '',
    message,
    status: 'pending'
  });

  return NextResponse.json({ ok: true, comment: { ...comment, createdAt: comment.createdAt.toISOString() } });
}
