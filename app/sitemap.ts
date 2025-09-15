import type { MetadataRoute } from 'next';
import { getCaseSlugs } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://your-domain.ru';
  const cases = getCaseSlugs().map((f) => ({ url: `${base}/cases/${f.replace(/\.mdx$/, '')}`, lastModified: new Date() }));
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    ...cases,
  ];
}