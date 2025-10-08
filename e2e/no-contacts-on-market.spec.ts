import { test, expect } from '@playwright/test';

const forbiddenPatterns = [
  /mailto:/i,
  /tel:/i,
  /t\.me/i,
  /wa\.me/i,
  /viber:/i,
  /whatsapp/i,
  /telegram/i,
  /vk\.com/i,
  /instagram\.com/i,
];

const usernameAllowList = new Set(['media', 'supports', 'charset', 'layer', 'keyframes', 'scope', 'import']);

function extractForbiddenUsernames(html: string) {
  const matches: string[] = [];
  const regex = /@([A-Za-z0-9_]{3,})/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const token = match[1].toLowerCase();
    if (!usernameAllowList.has(token)) {
      matches.push(token);
    }
  }
  return matches;
}

test('no-contacts-on-market', async ({ page }) => {
  const response = await page.goto('/market', { waitUntil: 'networkidle' });
  expect(response, 'expected response from /market').not.toBeNull();
  expect(response?.ok(), 'expected 2xx response for /market').toBeTruthy();

  const contactAnchors = await page.$$eval('a[href^="mailto:"], a[href^="tel:"]', (elements) => elements.length);
  expect(contactAnchors, 'no mailto/tel anchors allowed').toBe(0);

  await expect(page.locator('form')).toHaveCount(0);

  const content = await page.content();
  for (const pattern of forbiddenPatterns) {
    expect(content).not.toMatch(pattern);
  }

  const usernames = extractForbiddenUsernames(content);
  expect(usernames, `username-like mentions detected: ${usernames.join(', ')}`).toHaveLength(0);

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/i);
  const canonicalHref = await page.getAttribute('link[rel="canonical"]', 'href');
  expect(canonicalHref).toBeTruthy();
  if (canonicalHref) {
    const canonicalUrl = canonicalHref.startsWith('http')
      ? new URL(canonicalHref)
      : new URL(canonicalHref, response?.url() ?? page.url());
    expect(['', '/']).toContain(canonicalUrl.pathname);
  }

  const headerValue = response?.headers()['x-robots-tag'];
  expect(headerValue).toBeDefined();
  expect(headerValue).toContain('noindex');
  expect(headerValue).toContain('nofollow');
  expect(headerValue).toContain('noarchive');
});
