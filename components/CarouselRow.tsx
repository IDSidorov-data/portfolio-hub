'use client';
import React from 'react';

type Props<T> = {
  id?: string;
  title: string;
  items: T[];
  render: (item: T, idx: number) => React.ReactNode;
  className?: string;
};

export default function CarouselRow<T>({ id, title, items, render, className }: Props<T>) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-0 md:px-6 py-10 cv-auto ${className ?? ''}`}>
      <h2 className="mb-4 text-2xl font-semibold scroll-mt-24">{title}</h2>
      <div className="md:hidden">
<div className="grid auto-cols-[85%] grid-flow-col gap-4 snap-x md:snap-mandatory snap-proximity overflow-x-auto [-webkit-overflow-scrolling:touch] touch-auto md:touch-pan-x scroll-px-0 px-0" role="list" aria-label={title}>
          {items.map((it, i) => (
            <div key={i} className="snap-start" role="listitem">
              {render(it, i)}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => <div key={i}>{render(it, i)}</div>)}
      </div>
    </section>
  );
}