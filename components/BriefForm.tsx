'use client';

import { useState, useMemo, useEffect } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { sendEvent } from '@/lib/analytics';

const Schema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().trim().email('Неверный формат email'),
  tg: z.string().trim().optional(),
  about: z.string().trim().min(10, 'Опишите задачу хотя бы в 10 символов'),
  budget: z.string().trim().optional(),
  source: z.string().trim().default('site'),
});

type FormData = z.infer<typeof Schema>;

export default function BriefForm({ defaultSource }: { defaultSource?: string }) {
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    tg: '',
    about: '',
    budget: '',
    source: defaultSource || 'site',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  useEffect(() => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile);
      setResumePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [resumeFile]);

  const onChange = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key as string]: '' }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const parsed = Schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path.join('.') || 'form';
        fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('request_failed');
      sendEvent('brief_submitted', { source: parsed.data.source });
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('brief_toast', '1');
      }
      router.push('/thanks?ok=1');
    } catch (e) {
      setErrors((p) => ({
        ...p,
        form: 'Не удалось отправить. Попробуйте ещё раз.',
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input type="hidden" name="source" value={data.source} />

      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-medium opacity-80">Имя</label>
        <input
          className="w-full rounded-xl border p-3 text-sm"
          value={data.name ?? ''}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Как к вам обращаться"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
        )}
      </div>

      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-medium opacity-80">Email *</label>
        <input
          required
          type="email"
          className="w-full rounded-xl border p-3 text-sm"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="you@company.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-medium opacity-80">Telegram</label>
        <input
          className="w-full rounded-xl border p-3 text-sm"
          value={data.tg ?? ''}
          onChange={(e) => onChange('tg', e.target.value)}
          placeholder="@username"
        />
        {errors.tg && <p className="mt-1 text-xs text-red-600">{errors.tg}</p>}
      </div>

      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-medium opacity-80">Бюджет</label>
        <input
          className="w-full rounded-xl border p-3 text-sm"
          value={data.budget ?? ''}
          onChange={(e) => onChange('budget', e.target.value)}
          placeholder="например, 100–300 тыс. ₽"
        />
        {errors.budget && (
          <p className="mt-1 text-xs text-red-600">{errors.budget}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-medium opacity-80">О проекте *</label>
        <textarea
          className="min-h-[110px] w-full rounded-xl border p-3 text-sm"
          value={data.about}
          onChange={(e) => onChange('about', e.target.value)}
          placeholder="Кратко опишите контекст, цель и сроки"
        />
        {errors.about && (
          <p className="mt-1 text-xs text-red-600">{errors.about}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-medium opacity-80">
          Резюме/бриф (PDF/JPG/PNG)
        </label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="w-full rounded-xl border p-2 text-sm"
          onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
        />
        {resumePreview && (
          <div className="mt-2 rounded-xl border p-2">
            <div className="mb-1 text-xs opacity-80">Превью файла</div>
            {resumeFile?.type.includes('pdf') ? (
              <a
                href={resumePreview}
                target="_blank"
                className="text-sm text-blue-600 underline"
              >
                Открыть PDF
              </a>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resumePreview}
                alt="Превью резюме"
                className="max-h-48 rounded-md"
              />
            )}
          </div>
        )}
        <p className="mt-1 text-xs opacity-70">
          Файл не загружается на сервер в этой версии — только локальный предпросмотр.
        </p>
      </div>

      {errors.form && (
        <p className="md:col-span-2 text-sm text-red-600">{errors.form}</p>
      )}

      <div className="md:col-span-2 flex justify-end gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? 'Отправка…' : 'Отправить'}
        </button>
      </div>
    </form>
  );
}
