'use client';
import React from 'react';
import AuthNavigation from './AuthNavigation';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNavigation />
      {children}
      <div id="portal" />
    </>
  );
}
