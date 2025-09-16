import React from "react";

export default function Card({ className = "", children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md p-4 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}