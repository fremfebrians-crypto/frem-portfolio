import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth-admin';
import { uploadService } from '@/services/upload.service';

function publicAssetPath(filePath?: string | null) {
  if (!filePath) return null;
  return `/api/profile?asset=${encodeURIComponent(filePath)}`;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.portfolioItem.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error('PORTFOLIO DETAIL ERROR:', error);

    return NextResponse.json(
      {
        error: 'Gagal mengambil portfolio.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await db.portfolioItem.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    const form = await request.formData();

    const title = String(form.get('title') || existing.title).trim();
    const category = String(form.get('category') || existing.category || '').trim();
    const type =
      String(form.get('type') || existing.type).trim() === 'excel' ? 'excel' : 'image';
    const description = String(form.get('description') || existing.description || '').trim();
    const status =
      String(form.get('status') || existing.status).trim() === 'published'
        ? 'published'
        : 'draft';
    const sortOrder = Number(form.get('sortOrder') || existing.sortOrder || 0);

    const thumbnail = form.get('thumbnail');
    const image = form.get('image');
    const excel = form.get('excel');

    const updatedData: {
      title: string;
      category: string | null;
      type: 'image' | 'excel';
      description: string | null;
      status: string;
      sortOrder: number;
      thumbnailPath?: string | null;
      imagePath?: string | null;
      excelPath?: string | null;
      excelPreviewJson?: string | null;
    } = {
      title,
      category: category || null,
      type,
      description: description || null,
      status,
      sortOrder,
    };

    if (thumbnail instanceof File && thumbnail.size > 0) {
      const savedThumbnail = await uploadService.uploadImage(thumbnail, 'portfolio');
      updatedData.thumbnailPath = publicAssetPath(savedThumbnail);
    }

    if (type === 'image') {
      if (image instanceof File && image.size > 0) {
        const savedImage = await uploadService.uploadImage(image, 'portfolio');
        updatedData.imagePath = publicAssetPath(savedImage);
      } else {
        updatedData.imagePath = existing.imagePath;
      }

      updatedData.excelPath = null;
      updatedData.excelPreviewJson = null;
    }

    if (type === 'excel') {
      if (excel instanceof File && excel.size > 0) {
        const savedExcel = await uploadService.uploadPortfolioExcel(excel);
        updatedData.excelPath = savedExcel;
      } else {
        updatedData.excelPath = existing.excelPath;
      }

      updatedData.imagePath = null;
      updatedData.excelPreviewJson = null;
    }

    const updated = await db.portfolioItem.update({
      where: { id: params.id },
      data: updatedData,
    });

    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error('PORTFOLIO UPDATE ERROR:', error);

    return NextResponse.json(
      {
        error: 'Gagal update portfolio.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await db.portfolioItem.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    await db.portfolioItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('PORTFOLIO DELETE ERROR:', error);

    return NextResponse.json(
      {
        error: 'Gagal hapus portfolio.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}