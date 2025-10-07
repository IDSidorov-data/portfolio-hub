"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = { maxUploadMB?: number };

const BUDGETS = ["до 50к", "50–150к", "150–300к", "300к+", "не знаю"] as const;
const DEADLINES = ["как можно скорее", "2–4 недели", "1–3 месяца", "исследую"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TG_RE = /^[a-zA-Z0-9_]{3,32}$/;

const BASE_FIELD_CLASSES =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300/70 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-300 dark:focus:border-indigo-400/70 dark:focus:ring-indigo-400/60";
const SELECT_FIELD_CLASSES =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 shadow-sm transition focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300/70 dark:border-slate-600 dark:bg-slate-800/80 dark:focus:border-indigo-400/70 dark:focus:ring-indigo-400/60 dark:[color-scheme:dark]";

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
  const [file, setFile] = useState<File | null>(null);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [startedAt] = useState<number>(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!formRef.current) return;
    const budgetSelect = formRef.current.querySelector<HTMLSelectElement>("select[name=\"budget\"]");
    const deadlineSelect = formRef.current.querySelector<HTMLSelectElement>("select[name=\"deadline\"]");
    if (budgetSelect) setBudget(budgetSelect.value);
    if (deadlineSelect) setDeadline(deadlineSelect.value);
  }, []);

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
    const email = ((fd.get("email") as string) || "").trim();

    if (!telegramRaw && !email) return "Укажите Telegram или Email";
    if (telegramRaw && !TG_RE.test(telegramRaw)) return "Неверный Telegram username";
    if (email && !EMAIL_RE.test(email)) return "Неверный email";

    const about = (fd.get("about") as string)?.trim() || "";
    if (about.length < 20 || about.length > 1500) return "О проекте: 20–1500 символов";

    const budget = fd.get("budget") as string;
    const deadline = fd.get("deadline") as string;
    if (!BUDGETS.includes(budget as any)) return "Выберите бюджет";
    if (!DEADLINES.includes(deadline as any)) return "Выберите срок";
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
    if (telegram) {
      formData.set("telegram", telegram);
    } else {
      formData.delete("telegram");
    }

    const email = ((formData.get("email") as string) || "").trim();
    if (email) {
      formData.set("email", email);
    } else {
      formData.delete("email");
    }

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
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
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
        <label className="block text-sm mb-1 text-slate-700 dark:text-slate-100">Имя*</label>
        <input
          name="name"
          required
          minLength={2}
          maxLength={60}
          className={BASE_FIELD_CLASSES}
          placeholder="Иван"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-slate-700 dark:text-slate-100">Telegram</label>
          <input
            name="telegram"
            className={BASE_FIELD_CLASSES}
            placeholder="@username"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-slate-700 dark:text-slate-100">Email</label>
          <input
            name="email"
            className={BASE_FIELD_CLASSES}
            type="email"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1 text-slate-700 dark:text-slate-100">О проекте*</label>
        <textarea
          name="about"
          required
          minLength={20}
          maxLength={1500}
          className={`h-36 ${BASE_FIELD_CLASSES}`}
          placeholder="Коротко опишите задачу, цель, ссылки..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-slate-700 dark:text-slate-100">Бюджет*</label>
          <select
            name="budget"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className={`${SELECT_FIELD_CLASSES} text-slate-900 dark:text-slate-100`}
          >
            <option value="" disabled hidden className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
              Выберите
            </option>
            {BUDGETS.map((budgetOption) => (
              <option
                key={budgetOption}
                value={budgetOption}
                className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100"
              >
                {budgetOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 text-slate-700 dark:text-slate-100">Срок*</label>
          <select
            name="deadline"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            className={`${SELECT_FIELD_CLASSES} text-slate-900 dark:text-slate-100`}
          >
            <option value="" disabled hidden className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
              Выберите
            </option>
            {DEADLINES.map((deadlineOption) => (
              <option
                key={deadlineOption}
                value={deadlineOption}
                className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100"
              >
                {deadlineOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="block text-sm mb-1 text-slate-700 dark:text-slate-100">
          Файл (PDF/JPG/PNG/DOX/HLSX, ≤ {effectiveMaxUploadMB} МБ)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center rounded-md border border-slate-300/70 bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-white dark:border-transparent dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:focus:ring-indigo-400 dark:focus:ring-offset-slate-900"
          >
            Выбрать файл
          </button>
          <span className="text-sm text-slate-700 dark:text-slate-100">
            {file ? file.name : "Файл не выбран"}
          </span>
        </div>
        <input
          ref={fileInputRef}
          name="file"
          type="file"
          accept=".pdf,.dox,.hlsx,image/png,image/jpeg"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="sr-only pointer-events-none"
          tabIndex={-1}
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

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-900"
      >
        {status === "loading" ? "Отправляю…" : "Отправить"}
      </button>

      {status === "ok" && (
        <p className="text-green-600 text-sm">
          Спасибо! Я свяжусь в течение дня. Если срочно — TG @idsidorov
        </p>
      )}
      {status === "error" && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
