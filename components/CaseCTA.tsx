import Link from 'next/link';

export default function CaseCTA({ result }: { result?: string }) {
  return (
    <div className="mt-10 rounded-2xl border p-5 md:p-6 bg-foreground/5">
      <div className="text-sm uppercase tracking-wide opacity-70 mb-1">Результат</div>
      {result ? (
        <div className="text-lg font-medium">{result}</div>
      ) : (
        <div className="text-lg font-medium">
          Готов обсудить, как применить этот подход в вашем проекте.
        </div>
      )}
      <div className="mt-4">
        <Link
          href="#brief"
          className="inline-flex items-center rounded-xl px-4 py-2 border hover:opacity-90 transition"
        >
          Обсудить проект
        </Link>
      </div>
    </div>
  );
}
