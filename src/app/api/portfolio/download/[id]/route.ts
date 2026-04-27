import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.pdf') {
    return 'application/pdf';
  }

  if (ext === '.xlsm') {
    return 'application/vnd.ms-excel.sheet.macroEnabled.12';
  }

  if (ext === '.xlsx') {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }

  if (ext === '.xls') {
    return 'application/vnd.ms-excel';
  }

  if (ext === '.csv') {
    return 'text/csv';
  }

  return 'application/octet-stream';
}

function safeFilename(name: string) {
  return name.replace(/[\\/:*?"<>|]+/g, '-').trim();
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.portfolioItem.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Portfolio tidak ditemukan.' },
        { status: 404 }
      );
    }

    // Determine which file to serve: excel or pdf
    const filePath = item.excelPath || item.pdfPath;

    if (!filePath) {
      return NextResponse.json(
        { error: 'File belum tersedia untuk portfolio ini.' },
        { status: 404 }
      );
    }

    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(filePath) || '.bin';
    const filename = safeFilename(`${item.title}${ext}`);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': getContentType(filePath),
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Gagal membaca file.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}