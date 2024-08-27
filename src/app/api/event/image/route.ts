import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { objectUrl } = await req.json();
    console.log(objectUrl);
  } catch (e) {
    return new NextResponse(null, { status: 500 });
  }
  return new NextResponse(null, { status: 500 });
}
