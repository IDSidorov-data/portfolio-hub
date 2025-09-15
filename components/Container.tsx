export default function Container({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`mx-auto w-full max-w-[1200px] px-5 ${className}`}>{children}</div>;
}