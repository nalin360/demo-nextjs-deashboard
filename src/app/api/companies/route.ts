import { companies } from '@/src/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(Object.keys(companies));
}
