import { companies } from '@/src/lib/data';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;
  const company = companies[ticker as keyof typeof companies];
  
  if (company) {
    return NextResponse.json(company);
  }
  
  return new NextResponse(null, { status: 404 });
}
