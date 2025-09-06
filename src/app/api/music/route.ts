
import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error('Cloudflare R2 credentials are not set in environment variables');
}

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://\${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function GET() {
  try {
    const list = await R2.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );

    const songs = list.Contents?.map(item => {
      const url = `https://\${accountId}.r2.cloudflarestorage.com/\${bucketName}/\${item.Key}`;
      return {
        key: item.Key,
        title: item.Key?.split('/').pop()?.replace(/\.mp3/i, '') || 'Unknown Title',
        url: url,
      };
    });

    return NextResponse.json({ songs: songs || [] });
  } catch (error) {
    console.error('Error fetching from R2:', error);
    return NextResponse.json({ error: 'Failed to fetch songs from R2.' }, { status: 500 });
  }
}
