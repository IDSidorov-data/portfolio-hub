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
    <section id={id} className={`mx-auto max-w-6xl px-4 md:px-6 py-10 cv-auto ${className ?? ''}`}>
      <h2 className="mb-4 text-2xl font-semibold scroll-mt-24">{title}</h2>

      {/* Mobile: горизонтальная карусель */}
      <div className="md:hidden">
        <div
          className="grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory touch-pan-x"
          role="list" aria-label={title}
        >
          {items.map((it, i) => (
            <div key={i} className="snap-start" role="listitem">
              {render(it, i)}
            </div>
          ))}
        </div>
      </div>

      {/* ≥ md: обычная сетка */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => <div key={i}>{render(it, i)}</div>)}
      </div>
    </section>
  );
}
