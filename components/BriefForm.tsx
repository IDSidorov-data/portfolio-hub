"use client";

import React, { useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = { maxUploadMB?: number };

const BUDGETS = ["до 50к", "50–150к", "150–300к", "300к+", "не знаю"] as const;
const DEADLINES = ["как можно скорее", "2–4 недели", "1–3 месяца", "исследую"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TG_RE = /^[a-zA-Z0-9_]{3,32}$/;

async function compressImageIfNeeded(file: File, maxBytes: number): Promise<File> {
  if (!/^image\/(png|jpeg)$/.test(file.type) || file.size <= maxBytes) return file;

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read error"));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  const img = document.createElement("img");
  img.src = dataUrl;
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = () => reject(new Error("load error"));
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  const scale = Math.min(1, Math.sqrt((maxBytes * 0.9) / file.size));
  const width = Math.max(1, Math.floor(img.width * scale));
  const height = Math.max(1, Math.floor(img.height * scale));
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), file.type, 0.8)
  );
  if (!blob) return file;

  return new File([blob], file.name.replace(/\s+/g, "_"), { type: file.type });
}

export default function BriefForm({ maxUploadMB }: Props) {
  const envMax = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_MB ?? 4);
  const fallbackMax = Number.isFinite(envMax) && envMax > 0 ? envMax : 4;
  const effectiveMaxUploadMB = maxUploadMB && maxUploadMB > 0 ? maxUploadMB : fallbackMax;
  const pathname = usePathname();
  const search = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [startedAt] = useState<number>(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const utm = useMemo(() => {
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
    const values: Record<string, string> = {};
    keys.forEach((key) => {
      const value = search.get(key);
      if (value) values[key] = value;
    });
    return values;
  }, [search]);

  function validateClient(fd: FormData): string | null {
    const name = (fd.get("name") as string)?.trim();
    if (!name || name.length < 2 || name.length > 60) return "Имя: 2–60 символов";
    if (/(https?:\/\/|www\.|@.+\.)/i.test(name)) return "Имя не должно содержать ссылки/упоминания";

    const telegramRaw = ((fd.get("telegram") as string) || "").replace(/^@/, "");
    const email = (fd.get("email") as string) || "";

    if (!telegramRaw && !email) return "Укажите Telegram или Email";
    if (telegramRaw && !TG_RE.test(telegramRaw)) return "Неверный Telegram username";
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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");
    setError("");

    const formData = new FormData(formRef.current);
    formData.set("startedAt", String(startedAt));
    formData.set("page", pathname || "/");
    formData.set("ref", document.referrer || "");
    Object.entries(utm).forEach(([key, value]) => formData.set(key, value));

    const telegram = ((formData.get("telegram") as string) || "").trim().replace(/^@/, "");
    if (telegram) formData.set("telegram", telegram);

    const validationError = validateClient(formData);
    if (validationError) {
      setStatus("error");
      setError(validationError);
      return;
    }

    const maxBytes = effectiveMaxUploadMB * 1024 * 1024;
    if (file && /^image\/(png|jpeg)$/.test(file.type) && file.size > maxBytes) {
      try {
        const compressed = await compressImageIfNeeded(file, maxBytes);
        formData.set("file", compressed, compressed.name);
      } catch {
        formData.set("file", file, file.name);
      }
    }

    try {
      const response = await fetch("/api/brief", { method: "POST", body: formData });
      const json = await response.json().catch(() => ({}));
      if (response.ok && json?.ok) {
        setStatus("ok");
        setFile(null);
        const fileInput = formRef.current?.querySelector<HTMLInputElement>('input[name="file"]');
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        setStatus("error");
        setError(
          json?.error ||
            (response.status === 429
              ? "Слишком часто. Попробуйте через минуту"
              : "Ошибка отправки")
        );
      }
    } catch {
      setStatus("error");
      setError("Сеть недоступна. Повторите позже");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
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
          <select
            name="budget"
            className="w-full rounded border px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>
              Выберите
            </option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Срок*</label>
          <select
            name="deadline"
            className="w-full rounded border px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>
              Выберите
            </option>
            {DEADLINES.map((deadline) => (
              <option key={deadline} value={deadline}>
                {deadline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">
          Файл (PDF/JPG/PNG, ≤ {effectiveMaxUploadMB} МБ)
        </label>
        <input
          name="file"
          type="file"
          accept=".pdf,image/png,image/jpeg"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
        />
      </div>

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
