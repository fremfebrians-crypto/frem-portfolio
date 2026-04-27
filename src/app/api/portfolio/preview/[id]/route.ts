import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.portfolioItem.findUnique({
      where: { id: params.id },
    });

    if (!item || !item.pdfPath) {
      return NextResponse.json(
        { error: 'PDF not found.' },
        { status: 404 }
      );
    }

    const fileBuffer = await fs.readFile(item.pdfPath);
    const filename = path.basename(item.pdfPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Gagal membaca PDF.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
