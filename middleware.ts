// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 조건에 따라 리디렉션하지 않고, 정상적으로 페이지를 보여줌
  return NextResponse.next();
}

export const config = {
  matcher: '/feed/:path*',
};
