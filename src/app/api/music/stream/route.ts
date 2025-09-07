
import { NextResponse, NextRequest } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export async function GET(req: NextRequest) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
  const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    return NextResponse.json({ error: 'Server configuration error: Cloudflare R2 credentials are not set.' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Song key is required' }, { status: 400 });
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
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const { Body, ContentType, ContentLength } = await R2.send(command);

    if (!Body) {
        return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    const headers = new Headers();
    if (ContentType) {
      headers.set('Content-Type', ContentType);
    }
    if (ContentLength) {
      headers.set('Content-Length', String(ContentLength));
    }
    headers.set('Accept-Ranges', 'bytes');

    return new Response(Body as any, {
      status: 200,
      headers,
    });

  } catch (error: any) {
    console.error('Error fetching from R2:', error);
    if (error.name === 'NoSuchKey') {
        return NextResponse.json({ error: 'Song not found in R2 bucket.' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to stream song from R2.' }, { status: 500 });
  }
}
