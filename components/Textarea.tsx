'use client';
import * as React from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string };

export default function Textarea({ className = '', ...props }: Props) {
  const cls =
    'rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:outline-none ' +
    className;
  return <textarea className={cls} {...props} />;
}
