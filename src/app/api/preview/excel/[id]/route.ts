import { NextRequest, NextResponse } from 'next/server';
import { portfolioService } from '@/services/portfolio.service';
import { readJsonFile } from '@/lib/storage';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const item = await portfolioService.get(params.id);
  if (!item?.excelPreviewJson) {
    return NextResponse.json({ error: 'Preview not found.' }, { status: 404 });
  }
  const preview = await readJsonFile(item.excelPreviewJson);
  return NextResponse.json({ preview });
}
