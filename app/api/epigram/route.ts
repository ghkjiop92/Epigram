// app/api/epigram/route.ts
import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

// ✅ GET: 에피그램 목록 조회
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

// ✅ POST: 에피그램 새로 저장
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, author, sourceTitle, sourceUrl, tags } = body;

    // 유효성 검사
    if (!content || content.length > 500) {
      return NextResponse.json(
        { error: '내용은 500자 이내여야 합니다.' },
        { status: 400 },
      );
    }

    if (!author || author.trim() === '') {
      return NextResponse.json(
        { error: '작성자는 필수입니다.' },
        { status: 400 },
      );
    }

    const epigram = await prisma.epigram.create({
      data: {
        content,
        author,
        sourceTitle,
        sourceUrl,
        tags: Array.isArray(tags) ? tags.join(',') : tags || null,
      },
    });

    return NextResponse.json(
      { success: true, id: epigram.id },
      { status: 200 },
    );
  } catch (error) {
    console.error('[POST /api/epigram] 에러:', error);
    return NextResponse.json({ error: '저장 실패' }, { status: 500 });
  }
}
