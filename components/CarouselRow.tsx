'use client';
import React from 'react';

type Props<T> = {
  id?: string;
  title: string;
  items: T[];
  render: (item: T, idx: number) => React.ReactNode; 
  className?: string;
  right?: React.ReactNode; 
};

export default function CarouselRow<T>({
  id,
  title,
  items,
  render,
  className,
  right,
}: Props<T>) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-4 md:px-6 py-10 ${className ?? ''}`}
    >
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {right}
      </div>

      {/* Mobile: горизонтальный скролл с snap */}
      <div className="md:hidden -mx-4 px-4">
        <div
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory snap-always touch-pan-x"
          role="list"
          aria-label={title}
        >
          {items.map((it, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[85%]"
              role="listitem"
            >
              {render(it, i)}
            </div>
          ))}
        </div>
      </div>

      {/* ≥ md: обычная сетка */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i}>{render(it, i)}</div>
        ))}
      </div>
    </section>
  );
}
