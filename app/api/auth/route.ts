// app/api/auth/route.ts

import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import prisma from '../../lib/prisma'; // ⚠️ 실제 경로에 맞게 수정하세요

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 모두 입력하세요.' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: '존재하지 않는 계정입니다.' },
        { status: 401 },
      );
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 },
      );
    }

    // 로그인 성공 처리
    return NextResponse.json({
      message: '로그인 성공',
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
