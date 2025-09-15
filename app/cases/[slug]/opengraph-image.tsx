import { ImageResponse } from 'next/og';
import { readCaseBySlug } from '@/lib/mdx';
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image({ params }: { params: { slug: string } }) {
  const { frontmatter } = readCaseBySlug(params.slug);
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#0B1020', color: 'white', padding: 64, flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 56, fontWeight: 700 }}>{frontmatter.title}</div>
        <div style={{ fontSize: 28, opacity: 0.8 }}>{frontmatter.tag}</div>
        <div style={{ fontSize: 22, opacity: 0.6 }}>Иван Сидоров · sistem-arch.ru</div>
      </div>
    ),
    { ...size }
  );
}