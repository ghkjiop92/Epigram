import prisma from 'lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '10');
    const skip = (page - 1) * size;

    console.log('[API] 요청됨 → page:', page, 'skip:', skip, 'size:', size);

    const epigrams = await prisma.epigram.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: size,
    });

    console.log('[API] epigrams:', epigrams);

    const total = await prisma.epigram.count();

    return NextResponse.json({
      content: epigrams,
      page,
      hasNext: total > page * size,
    });
  } catch (error) {
    console.error('[GET /api/epigram] 에러:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
