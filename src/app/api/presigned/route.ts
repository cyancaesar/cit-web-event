import { NextResponse, type NextRequest } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function GET(req: NextRequest) {
  const accessKeyId = process.env.AWS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const s3BucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!accessKeyId || !secretAccessKey || !s3BucketName) {
    return new NextResponse(null, { status: 500 });
  }

  const searchParams = req.nextUrl.searchParams;
  const fileName = searchParams.get('file');
  const contentType = searchParams.get('type');
  if (!fileName || !contentType) {
    return new NextResponse(null, { status: 500 });
  }

  const client = new S3Client({
    region: 'eu-central-1',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const command = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: fileName,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  if (signedUrl) return NextResponse.json({ signedUrl });
  return new NextResponse(null, { status: 500 });
}
