import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const pass = formData.get('pass');

  return NextResponse.json({ message: '회원가입 성공' }, { status: 200 });
}
