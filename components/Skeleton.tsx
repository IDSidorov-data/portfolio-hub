import * as React from 'react';

export default function Skeleton({ className = '' }: { className?: string }) {
  return <div className={'animate-pulse rounded-xl bg-slate-100 dark:bg-slate-700/40 ' + className} />;
}
