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

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = Body.parse(json);

    const { data: existing } = await supabase.from('contacts').select('id').eq('email', body.email).maybeSingle();
    let contact_id = existing?.id as string | undefined;
    if (!contact_id) {
      const { data } = await supabase.from('contacts').insert({ name: body.name, email: body.email, tg: body.tg }).select('id').single();
      contact_id = data?.id;
    }

    await supabase.from('briefs').insert({ contact_id, about: body.about, budget: body.budget, source: body.source });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'unknown' }, { status: 400 });
  }
}