import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const Body = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  tg: z.string().optional(),
  about: z.string().optional(),
  budget: z.string().optional(),
  source: z.string().default('site'),
});

async function sendEmails(body: z.infer<typeof Body>) {
  const toMe = process.env.MAIL_TO || process.env.MAIL_FROM;
  const from = process.env.MAIL_FROM;
  const resendKey = process.env.RESEND_API_KEY;

  const subjectMe = `Новая заявка с сайта (${body.source})`;
  const subjectClient = `Спасибо за заявку`;
  const htmlMe = `
    <h2>Новая заявка</h2>
    <ul>
      <li><b>Имя:</b> ${body.name ?? '-'}</li>
      <li><b>Email:</b> ${body.email}</li>
      <li><b>Telegram:</b> ${body.tg ?? '-'}</li>
      <li><b>Бюджет:</b> ${body.budget ?? '-'}</li>
      <li><b>Источник:</b> ${body.source}</li>
    </ul>
    <p><b>О проекте:</b></p>
    <p>${(body.about ?? '').replace(/\n/g, '<br/>')}</p>
  `;
  const htmlClient = `
    <p>Спасибо за заявку! Я получил вашу информацию и отвечу в ближайшее время.</p>
    <p>Если срочно, напишите в Telegram: <a href="https://t.me/${(body.tg ?? '').replace('@','')}">${body.tg ?? ''}</a></p>
  `;

  if (!from) return;

  try {
    if (resendKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);
      if (toMe) {
        await resend.emails.send({ from, to: toMe, subject: subjectMe, html: htmlMe });
      }
      await resend.emails.send({ from, to: body.email, subject: subjectClient, html: htmlClient });
      return;
    }

    // SMTP fallback
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (toMe) {
      await transporter.sendMail({ from, to: toMe, subject: subjectMe, html: htmlMe });
    }
    await transporter.sendMail({ from, to: body.email, subject: subjectClient, html: htmlClient });
  } catch (e) {
    console.error('Email send failed', e);
  }
}

export async function POST(req: NextRequest) {
  try {
    // 🔒 Ранняя проверка на наличие конфигурации
    const hasSupabase = !!process.env.SUPABASE_URL && !!process.env.SUPABASE_ANON_KEY;
    const hasMail = !!process.env.RESEND_API_KEY || (!!process.env.MAIL_FROM && !!process.env.MAIL_TO);

    if (!hasSupabase || !hasMail) {
      return NextResponse.json(
        { ok: false, error: 'Service unavailable' },
        { status: 503 }
      );
    }

    const json = await req.json();
    const result = Body.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: 'invalid_body', details: result.error.flatten() },
        { status: 400 }
      );
    }
    const body = result.data;

    // find or create contact
    const { data: existing, error: exErr } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', body.email)
      .maybeSingle();

    if (exErr) throw exErr;

    let contact_id = existing?.id as string | undefined;
    if (!contact_id) {
      const { data: ins, error: insErr } = await supabase
        .from('contacts')
        .insert({ name: body.name ?? null, email: body.email, tg: body.tg ?? null })
        .select('id')
        .single();
      if (insErr) throw insErr;
      contact_id = ins?.id;
    }

    const { error: briefErr } = await supabase
      .from('briefs')
      .insert({ contact_id, about: body.about ?? null, budget: body.budget ?? null, source: body.source });
    if (briefErr) throw briefErr;

    // fire-and-forget emails (no await)
    sendEmails(body);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'unknown' }, { status: 400 });
  }
}
