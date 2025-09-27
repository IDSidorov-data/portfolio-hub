import clsx from "@/lib/clsx";
import * as React from "react";

type BulletListProps = {
  items: (string | React.ReactNode)[];
  className?: string;
};

export default function BulletList({ items, className }: BulletListProps) {
  return (
    <ul
      className={clsx(
        "list-disc pl-5 space-y-1.5 marker:text-slate-400 dark:marker:text-slate-200 text-sm md:text-base",
        className,
      )}
    >
      {items.map((item, index) => (
        <li key={index} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}