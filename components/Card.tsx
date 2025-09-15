export default function Card({ className = "", children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={`rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}