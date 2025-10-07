"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCleanMode } from "@/lib/clean-mode";

type Props = { maxUploadMB: number };

const BUDGETS = ["до 50к", "50–150к", "150–300к", "300к+", "не знаю"] as const;
const DEADLINES = ["как можно скорее", "2–4 недели", "1–3 месяца", "исследую"] as const;

// простой email и tg паттерны (клиентская проверка; сервер — источник истины)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TG_RE = /^[a-zA-Z0-9_]{3,32}$/;

// клиентская компрессия изображений
async function compressImageIfNeeded(file: File, maxBytes: number): Promise<File> {
  if (!/^image\/(png|jpeg)$/.test(file.type) || file.size <= maxBytes) return file;

  const img = document.createElement("img");
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read error"));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
  img.src = dataUrl;
  await new Promise((r) => (img.onload = () => r(null)));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  // грубая оценка масштаба по корню отношения размеров
  const scale = Math.min(1, Math.sqrt((maxBytes * 0.9) / file.size));
  const w = Math.max(1, Math.floor(img.width * scale));
  const h = Math.max(1, Math.floor(img.height * scale));
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(img, 0, 0, w, h);

  const type = file.type; // сохраняем тип
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), type, 0.8)
  );
  if (!blob) return file;

  // если после сжатия всё равно больше лимита — отдадим, сервер отклонит
  const name = file.name.replace(/\s+/g, "_");
  return new File([blob], name, { type });
}

export default function BriefForm({ maxUploadMB }: Props) {
  const cleanMode = useCleanMode();
  if (cleanMode) {
    return null;
  }

  const pathname = usePathname();
  const search = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [agree, setAgree] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [startedAt] = useState<number>(() => Date.now()); // ts загрузки формы
  const formRef = useRef<HTMLFormElement>(null);

  // utm_* из URL
  const utm = useMemo(() => {
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
    const o: Record<string, string> = {};
    keys.forEach((k) => {
      const v = search.get(k);
      if (v) o[k] = v;
    });
    return o;
  }, [search]);

  // валидация минимум на клиенте (сервер — источник истины)
  function validateClient(fd: FormData): string | null {
    const name = (fd.get("name") as string)?.trim();
    if (!name || name.length < 2 || name.length > 60) return "Имя: 2–60 символов";
    if (/(https?:\/\/|www\.|@.+\.)/i.test(name)) return "Имя не должно содержать ссылки/упоминания";

    const tgRaw = ((fd.get("telegram") as string) || "").replace(/^@/, "");
    const email = (fd.get("email") as string) || "";

    if (!tgRaw && !email) return "Укажите Telegram или Email";
    if (tgRaw && !TG_RE.test(tgRaw)) return "Неверный Telegram username";
    if (email && !EMAIL_RE.test(email)) return "Неверный email";

    const about = (fd.get("about") as string)?.trim() || "";
    if (about.length < 20 || about.length > 1500) return "О проекте: 20–1500 символов";

    const budget = fd.get("budget") as string;
    const deadline = fd.get("deadline") as string;
    if (!BUDGETS.includes(budget as any)) return "Выберите бюджет";
    if (!DEADLINES.includes(deadline as any)) return "Выберите срок";

    if (!agree) return "Необходимо согласие";
    return null;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");
    setError("");

    const raw = new FormData(formRef.current);
    raw.set("startedAt", String(startedAt));
    raw.set("page", pathname || "/");
    raw.set("ref", document.referrer || "");
    Object.entries(utm).forEach(([k, v]) => raw.set(k, v));

    // нормализуем telegram
    const tg = ((raw.get("telegram") as string) || "").trim().replace(/^@/, "");
    if (tg) raw.set("telegram", tg);

    // клиентская валидация
    const v = validateClient(raw);
    if (v) {
      setStatus("error");
      setError(v);
      return;
    }

    // компрессия изображений (> MAX_UPLOAD_MB)
    const maxBytes = maxUploadMB * 1024 * 1024;
    const f = file;
    if (f && /^image\/(png|jpeg)$/.test(f.type) && f.size > maxBytes) {
      try {
        const smaller = await compressImageIfNeeded(f, maxBytes);
        raw.set("file", smaller, smaller.name);
      } catch {
        // если не удалось сжать — отправим как есть, сервер проверит
        raw.set("file", f, f.name);
      }
    }

    try {
      const res = await fetch("/api/brief", { method: "POST", body: raw });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) {
        setStatus("ok");
        // поля не сбрасываем — по ТЗ «данные не теряем», но можно очистить file
        setFile(null);
        const fileInput = formRef.current?.querySelector<HTMLInputElement>('input[name="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        setStatus("error");
        setError(
          json?.error ||
            (res.status === 429 ? "Слишком часто. Попробуйте через минуту" : "Ошибка отправки")
        );
      }
    } catch {
      setStatus("error");
      setError("Сеть недоступна. Повторите позже");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label className="block text-sm mb-1">Имя*</label>
        <input
          name="name"
          required
          minLength={2}
          maxLength={60}
          className="w-full rounded border px-3 py-2"
          placeholder="Иван"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Telegram</label>
          <input
            name="telegram"
            className="w-full rounded border px-3 py-2"
            placeholder="@username"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            className="w-full rounded border px-3 py-2"
            type="email"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">О проекте*</label>
        <textarea
          name="about"
          required
          minLength={20}
          maxLength={1500}
          className="w-full rounded border px-3 py-2 h-36"
          placeholder="Коротко опишите задачу, цель, ссылки..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Бюджет*</label>
          <select name="budget" className="w-full rounded border px-3 py-2" defaultValue="">
            <option value="" disabled>
              Выберите
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Срок*</label>
          <select name="deadline" className="w-full rounded border px-3 py-2" defaultValue="">
            <option value="" disabled>
              Выберите
            </option>
            {DEADLINES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Файл (PDF/JPG/PNG, ≤ {maxUploadMB} МБ)</label>
        <input
          name="file"
          type="file"
          accept=".pdf,image/png,image/jpeg"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      {/* скрытые служебные */}
      <input type="hidden" name="startedAt" />
      <input type="hidden" name="page" />
      <input type="hidden" name="ref" />
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />
      <input type="hidden" name="utm_term" />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="agree"
          checked={agree}
          onChange={() => setAgree((v) => !v)}
        />
        Согласен(на) с обработкой и отправкой данных
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {status === "loading" ? "Отправляю…" : "Отправить"}
      </button>

      {status === "ok" && (
        <p className="text-green-600 text-sm">
          Спасибо! Я свяжусь в течение дня. Если срочно — TG @idsidorov
        </p>
      )}
      {status === "error" && <p className="text-red-600 text-sm">{error}</p>}
      <p className="text-xs text-gray-400">
        Антиспам: honeypot, тайминг, троттлинг 60с, идемпотентность 300с.
      </p>
    </form>
  );
}
