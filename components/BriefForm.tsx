"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = { maxUploadMB: number };

const BUDGETS = ["до 50к", "50–150к", "150–300к", "300к+", "не знаю"] as const;
const DEADLINES = ["как можно скорее", "2–4 недели", "1–3 месяца", "исследую"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TG_RE = /^[a-zA-Z0-9_]{3,32}$/;

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
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  const scale = Math.min(1, Math.sqrt((maxBytes * 0.9) / file.size));
  const w = Math.max(1, Math.floor(img.width * scale));
  const h = Math.max(1, Math.floor(img.height * scale));
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(img, 0, 0, w, h);

  const type = file.type;
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), type, 0.8)
  );
  if (!blob) return file;

  const name = file.name.replace(/\s+/g, "_");
  return new File([blob], name, { type });
}

export default function BriefForm({ maxUploadMB }: Props) {
  const pathname = usePathname();
  const search = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState("");
  const [startedAt] = useState<number>(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const budgetControl = form.elements.namedItem("budget") as HTMLSelectElement | null;
    const deadlineControl = form.elements.namedItem("deadline") as HTMLSelectElement | null;
    if (budgetControl && budgetControl.value) {
      setSelectedBudget(budgetControl.value);
    }
    if (deadlineControl && deadlineControl.value) {
      setSelectedDeadline(deadlineControl.value);
    }
  }, []);

  const utm = useMemo(() => {
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
    const mapped: Record<string, string> = {};
    keys.forEach((key) => {
      const value = search.get(key);
      if (value) mapped[key] = value;
    });
    return mapped;
  }, [search]);

  function validateClient(fd: FormData): string | null {
    const name = (fd.get("name") as string)?.trim();
    if (!name || name.length < 2 || name.length > 60) return "Имя: 2–60 символов";
    if (/(https?:\/\/|www\.|@.+\.)/i.test(name)) return "Имя не должно содержать ссылки/упоминания";

    const tgRaw = ((fd.get("telegram") as string) || "").replace(/^@/, "");
    const email = (fd.get("email") as string) || "";

    if (!tgRaw && !email) return "Укажите Telegram или Email";
    if (tgRaw && !TG_RE.test(tgRaw)) return "Неверный Telegram username";
    if (email && !EMAIL_RE.test(email)) return "Неверный email";

    const about = ((fd.get("about") as string) || "").trim();
    if (about.length < 20 || about.length > 1500) return "О проекте: 20–1500 символов";

    const budget = (fd.get("budget") as string) || "";
    const deadline = (fd.get("deadline") as string) || "";
    if (!BUDGETS.includes(budget as (typeof BUDGETS)[number])) return "Выберите бюджет";
    if (!DEADLINES.includes(deadline as (typeof DEADLINES)[number])) return "Выберите срок";

    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");
    setError("");

    const raw = new FormData(formRef.current);
    raw.set("startedAt", String(startedAt));
    raw.set("page", pathname || "/");
    raw.set("ref", document.referrer || "");
    Object.entries(utm).forEach(([key, value]) => raw.set(key, value));

    const tg = ((raw.get("telegram") as string) || "").trim().replace(/^@/, "");
    if (tg) raw.set("telegram", tg);

    const clientError = validateClient(raw);
    if (clientError) {
      setStatus("error");
      setError(clientError);
      return;
    }

    const maxBytes = maxUploadMB * 1024 * 1024;
    const currentFile = file;
    if (currentFile && /^image\/(png|jpeg)$/.test(currentFile.type) && currentFile.size > maxBytes) {
      try {
        const smaller = await compressImageIfNeeded(currentFile, maxBytes);
        raw.set("file", smaller, smaller.name);
      } catch (err) {
        console.warn("Image compression failed", err);
        raw.set("file", currentFile, currentFile.name);
      }
    }

    try {
      const response = await fetch("/api/brief", { method: "POST", body: raw });
      const json = await response.json().catch(() => ({}));
      if (response.ok && json?.ok) {
        setStatus("ok");
        setFile(null);
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
          <div className="relative">
            <select
              name="budget"
              className={`w-full rounded border px-3 py-2 pr-8 ${selectedBudget ? "text-gray-900" : "text-transparent"}`}
              value={selectedBudget}
              onChange={(event) => setSelectedBudget(event.target.value)}
            >
              <option value="" disabled hidden />
              {BUDGETS.map((budget) => (
                <option key={budget} value={budget} className="text-gray-900">
                  {budget}
                </option>
              ))}
            </select>
            {!selectedBudget && (
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                Выберите
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Срок*</label>
          <div className="relative">
            <select
              name="deadline"
              className={`w-full rounded border px-3 py-2 pr-8 ${selectedDeadline ? "text-gray-900" : "text-transparent"}`}
              value={selectedDeadline}
              onChange={(event) => setSelectedDeadline(event.target.value)}
            >
              <option value="" disabled hidden />
              {DEADLINES.map((deadline) => (
                <option key={deadline} value={deadline} className="text-gray-900">
                  {deadline}
                </option>
              ))}
            </select>
            {!selectedDeadline && (
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                Выберите
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <span className="block text-sm mb-1">Файл (PDF/JPG/PNG, ≤ {maxUploadMB} МБ)</span>
        <label className="inline-flex items-center gap-3">
          <span className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer transition hover:bg-gray-50 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gray-400">
            Выбрать файл
          </span>
          <input
            name="file"
            type="file"
            accept=".pdf,image/png,image/jpeg"
            className="sr-only"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          <span className="text-sm text-gray-500 truncate max-w-[60%]" title={file ? file.name : undefined}>
            {file ? file.name : "Файл не выбран"}
          </span>
        </label>
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
        className="rounded bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 px-4 py-2 font-medium text-white shadow-md transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-70"
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
