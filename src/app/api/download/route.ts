import { NextRequest, NextResponse } from 'next/server';

function extractGoogleDriveFileId(url: string) {
  const directIdMatch = url.match(/[?&]id=([^&]+)/);
  if (directIdMatch?.[1]) return directIdMatch[1];

  const fileMatch = url.match(/\/file\/d\/([^/]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

  return null;
}

function safeFilename(name: string) {
  return name.replace(/[\\/:*?"<>|]+/g, '-').trim();
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    const filename = request.nextUrl.searchParams.get('filename') || 'download.xlsm';

    if (!url) {
      return NextResponse.json({ error: 'URL file tidak ada.' }, { status: 400 });
    }

    const fileId = extractGoogleDriveFileId(url);

    if (!fileId) {
      return NextResponse.json({ error: 'File ID Google Drive tidak valid.' }, { status: 400 });
    }

    const driveDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const upstream = await fetch(driveDownloadUrl, {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Gagal download dari Google Drive. Status ${upstream.status}` },
        { status: 502 }
      );
    }

    const contentType =
      upstream.headers.get('content-type') ||
      'application/vnd.ms-excel.sheet.macroEnabled.12';

    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeFilename(filename)}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Terjadi kesalahan saat download file.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}