import type { ReactNode } from 'react';

import CleanModeRootProvider from '@/components/CleanModeRootProvider';
import CasesLayout from '../../cases/layout';

export default function MarketCasesLayout({ children }: { children: ReactNode }) {
  return (
    <CleanModeRootProvider value>
      <CasesLayout>{children}</CasesLayout>
    </CleanModeRootProvider>
  );
}
