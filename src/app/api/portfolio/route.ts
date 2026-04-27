import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth-admin';
import { portfolioService } from '@/services/portfolio.service';
import { uploadService } from '@/services/upload.service';

function publicAssetPath(filePath?: string | null) {
  if (!filePath) return null;
  return `/api/profile?asset=${encodeURIComponent(filePath)}`;
}

export async function GET() {
  const items = await portfolioService.listPublic();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await request.formData();
  const title = String(form.get('title') || '').trim();
  const category = String(form.get('category') || '').trim();
  const type = String(form.get('type') || 'image').trim();
  const description = String(form.get('description') || '').trim();
  const status = String(form.get('status') || 'draft').trim();
  const sortOrder = Number(form.get('sortOrder') || 0);
  const thumbnail = form.get('thumbnail') as File | null;
  const file = (form.get('file') || form.get('image') || form.get('excel') || form.get('pdf')) as File | null;

  let thumbnailPath: string | null = null;
  let imagePath: string | null = null;
  let excelPath: string | null = null;
  let excelPreviewJson: string | null = null;
  let pdfPath: string | null = null;

  if (thumbnail && thumbnail.size) {
    thumbnailPath = await uploadService.uploadImage(thumbnail, 'portfolio');
  }

  if (file && file.size) {
    if (type === 'image') {
      const savedImage = await uploadService.uploadImage(file, 'portfolio');
      imagePath = publicAssetPath(savedImage);
    } else if (type === 'excel') {
      const excelUpload = await uploadService.uploadExcel(file);
      excelPath = excelUpload.storedPath;
      excelPreviewJson = excelUpload.previewFile;
    } else if (type === 'pdf') {
      pdfPath = await uploadService.uploadPdf(file);
    }
  }

  const item = await portfolioService.create({
    title,
    category,
    type,
    description,
    status,
    sortOrder,
    thumbnailPath: publicAssetPath(thumbnailPath),
    imagePath,
    excelPath,
    excelPreviewJson,
    pdfPath,
  });

  return NextResponse.json({ item });
}
