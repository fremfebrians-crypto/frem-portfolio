import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth-admin';
import { commentService } from '@/services/comment.service';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const status = String(body.status || '').trim();
  const item = await commentService.update(params.id, { status });
  return NextResponse.json({ item });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await commentService.remove(params.id);
  return NextResponse.json({ ok: true });
}
