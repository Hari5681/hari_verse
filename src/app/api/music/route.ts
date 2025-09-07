
import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function GET() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
  const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;
  const publicUrl = process.env.CLOUDFLARE_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    console.error('Cloudflare R2 environment variables are not set');
    return NextResponse.json({ error: 'Server configuration error: Cloudflare R2 credentials or public URL are not set.' }, { status: 500 });
  }

  const R2 = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  try {
    const list = await R2.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );

    if (!list.Contents || list.Contents.length === 0) {
      return NextResponse.json({ songs: [] });
    }

    const songs = list.Contents
      .filter(item => item.Key && (item.Key.toLowerCase().endsWith('.mp3') || item.Key.toLowerCase().endsWith('.m4a')))
      .map(item => {
        // Correctly encode each part of the path
        const url = `${publicUrl}/${item.Key!.split('/').map(part => encodeURIComponent(part)).join('/')}`;
        return {
          key: item.Key,
          title: item.Key!,
          url: url,
        };
      });

    return NextResponse.json({ songs: songs });
  } catch (error: any) {
    console.error('Error fetching from R2:', error);
    if (error.name) {
         return NextResponse.json({ error: `Failed to fetch songs from R2. Reason: ${error.name} - ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred while fetching songs from R2.' }, { status: 500 });
  }
}
