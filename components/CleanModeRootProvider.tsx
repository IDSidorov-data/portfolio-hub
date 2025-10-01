'use client';

import type { ReactNode } from 'react';
import { CleanModeProvider } from '@/lib/clean-mode';

export default function CleanModeRootProvider({
  value,
  children,
}: {
  value: boolean;
  children: ReactNode;
}) {
  return <CleanModeProvider value={value}>{children}</CleanModeProvider>;
}
