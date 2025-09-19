import type { MetadataRoute } from 'next';
import { readdirSync } from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Берём все .mdx из content/cases
  const casesDir = path.join(process.cwd(), 'content', 'cases');
  let caseSlugs: string[] = [];
  try {
    caseSlugs = readdirSync(casesDir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, '')); 
  } catch {
    caseSlugs = [];
  }

  const staticRoutes = ['/', '/cases', '/services', '/contacts'];
  const caseRoutes = caseSlugs.map((slug) => `/cases/${slug}`);

  return [...staticRoutes, ...caseRoutes].map((pathUrl) => ({
    url: `${siteUrl}${pathUrl}`,
    lastModified: new Date(),
  }));
}
