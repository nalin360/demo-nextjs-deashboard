import { companies } from '@/src/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(Object.keys(companies));
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
