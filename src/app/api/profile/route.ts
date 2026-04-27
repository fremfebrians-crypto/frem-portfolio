import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { profileService } from '@/services/profile.service';

function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.pdf') return 'application/pdf';

  return 'application/octet-stream';
}

function cleanAssetValue(asset: string) {
  let value = asset;

  // Kalau asset ternyata sudah berbentuk /api/profile?asset=...
  if (value.startsWith('/api/profile?asset=')) {
    value = value.replace('/api/profile?asset=', '');
  }

  try {
    value = decodeURIComponent(value);
  } catch {
    // biarkan kalau decode gagal
  }

  // Kalau masih ada query string nyangkut
  value = value.split('?')[0];

  return value;
}

async function findExistingFile(asset: string) {
  const cleaned = cleanAssetValue(asset);

  const candidates = [
    cleaned,
    path.join(process.cwd(), cleaned),
    path.join(process.cwd(), 'storage', 'private', cleaned),
  ];

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // lanjut coba path berikutnya
    }
  }

  throw new Error(
    `File asset tidak ditemukan. Asset: ${asset}. Dicoba: ${candidates.join(' | ')}`
  );
}

export async function GET(request: NextRequest) {
  try {
    const asset = request.nextUrl.searchParams.get('asset');
    const download = request.nextUrl.searchParams.get('download');

    // Handle CV download
    if (download === 'cv') {
      const profile = await profileService.getProfile();

      if (!profile?.cvPath) {
        return NextResponse.json(
          { error: 'CV belum diupload.' },
          { status: 404 }
        );
      }

      // cvPath bisa berupa absolute path atau relative path
      const cvFilePath = await findExistingFile(profile.cvPath);
      const fileBuffer = await fs.readFile(cvFilePath);
      const ext = path.extname(cvFilePath).toLowerCase();
      const contentType = ext === '.pdf' ? 'application/pdf' : getContentType(cvFilePath);
      const safeName = profile.fullName
        ? profile.fullName.replace(/[\\/:*?"<>|]+/g, '-').trim()
        : 'CV';

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `inline; filename="${safeName}-CV${ext || '.pdf'}"`,
          'Cache-Control': 'no-store',
        },
      });
    }

    // Handle asset serving (images, etc)
    if (asset) {
      const filePath = await findExistingFile(asset);
      const fileBuffer = await fs.readFile(filePath);

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': getContentType(filePath),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Default: return profile JSON
    const profile = await profileService.getProfile();

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('PROFILE GET ERROR:', error);

    return NextResponse.json(
      {
        error: 'Gagal mengambil profile atau asset.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}