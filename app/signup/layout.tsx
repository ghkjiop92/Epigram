'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthNavigation from '../(auth)/login/AuthNavigation';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthNavigation>
      <QueryClientProvider client={queryClient}>
        {children}
        <div id="portal" />
      </QueryClientProvider>
    </AuthNavigation>
  );
}
