'use client';
import React from 'react';
import AuthNavigation from '../(auth)/login/AuthNavigation';

import Navbar from '../../components/Navbar';
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      {children}
      <div id="portal" />
    </>
  );
}
