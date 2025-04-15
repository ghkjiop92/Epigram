import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../app/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  nickname: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: '이미 존재하는 이메일입니다.' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.nickname,
        email: body.email,
        password: hashedPassword,
      },
    });

    const { password, ...result } = user;

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('회원가입 실패:', error);
    return NextResponse.json(
      { message: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
