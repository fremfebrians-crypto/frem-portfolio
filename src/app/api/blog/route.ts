import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth-admin';
import { blogService } from '@/services/blog.service';
import { uploadService } from '@/services/upload.service';

function publicAssetPath(filePath?: string | null) {
  if (!filePath) return null;
  return `/api/profile?asset=${encodeURIComponent(filePath)}`;
}

export async function GET() {
  const items = await blogService.listPublic();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await request.formData();
  const title = String(form.get('title') || '').trim();
  const slug = String(form.get('slug') || '').trim();
  const excerpt = String(form.get('excerpt') || '').trim();
  const status = String(form.get('status') || 'draft').trim();
  const publishDateValue = String(form.get('publishDate') || '').trim();
  const publishDate = publishDateValue ? new Date(publishDateValue) : null;
  const thumbnail = form.get('thumbnail') as File | null;
  const file = form.get('file') as File | null;

  let thumbnailPath: string | null = null;
  let htmlFilePath: string | null = null;
  let renderedHtml: string | null = null;

  if (thumbnail && thumbnail.size) {
    thumbnailPath = await uploadService.uploadImage(thumbnail, 'portfolio');
  }

  if (file && file.size) {
    const uploaded = await uploadService.uploadHtml(file);
    htmlFilePath = uploaded.storedPath;
    renderedHtml = uploaded.renderedHtml;
  }

  const item = await blogService.create({
    title,
    slug,
    excerpt,
    status,
    publishDate,
    thumbnailPath: publicAssetPath(thumbnailPath),
    htmlFilePath,
    renderedHtml
  });

  return NextResponse.json({ item });
}
