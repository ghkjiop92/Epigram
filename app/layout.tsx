import "../styles/globals.css";
import type { Metadata } from "next";
import React from "react";

// SEO 등 기본 메타 설정 (선택사항)
export const metadata: Metadata = {
  title: "Epigram",
  description: "에피그램 프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko"> 
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
