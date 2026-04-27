import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth-admin';
import { uploadService } from '@/services/upload.service';

export async function POST(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const form = await request.formData();
  const file = form.get('file') as File | null;
  if (!file || !file.size) return NextResponse.json({ error: 'HTML file is required.' }, { status: 400 });
  const uploaded = await uploadService.uploadHtml(file);
  return NextResponse.json(uploaded);
}
