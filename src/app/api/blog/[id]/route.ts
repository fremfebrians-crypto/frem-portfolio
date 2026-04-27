import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth-admin';
import { blogService } from '@/services/blog.service';
import { uploadService } from '@/services/upload.service';

function publicAssetPath(filePath?: string | null) {
  if (!filePath) return null;
  return `/api/profile?asset=${encodeURIComponent(filePath)}`;
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const item = await blogService.get(params.id);
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const current = await blogService.get(params.id);
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const form = await request.formData();
  const thumbnail = form.get('thumbnail') as File | null;
  const file = form.get('file') as File | null;

  const updateData: Record<string, unknown> = {
    title: String(form.get('title') || current.title),
    slug: String(form.get('slug') || current.slug),
    excerpt: String(form.get('excerpt') || current.excerpt || ''),
    status: String(form.get('status') || current.status),
    publishDate: form.get('publishDate') ? new Date(String(form.get('publishDate'))) : current.publishDate
  };

  if (thumbnail && thumbnail.size) {
    const saved = await uploadService.uploadImage(thumbnail, 'portfolio');
    updateData.thumbnailPath = publicAssetPath(saved);
  }

  if (file && file.size) {
    const uploaded = await uploadService.uploadHtml(file);
    updateData.htmlFilePath = uploaded.storedPath;
    updateData.renderedHtml = uploaded.renderedHtml;
  }

  const item = await blogService.update(params.id, updateData);
  return NextResponse.json({ item });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await blogService.remove(params.id);
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  const form = await request.formData();
  if (String(form.get('_method')) === 'DELETE') {
    return DELETE(request, context);
  }
  return NextResponse.json({ error: 'Unsupported request' }, { status: 400 });
}
