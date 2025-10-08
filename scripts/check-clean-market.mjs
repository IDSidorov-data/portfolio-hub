import { spawn } from 'node:child_process';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';

const port = Number.parseInt(process.env.CLEAN_MARKET_PORT ?? '4010', 10);
const baseUrl = `http://127.0.0.1:${port}`;

const server = spawn('npm', ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', String(port)], {
  stdio: 'pipe',
  env: { ...process.env, PORT: String(port) },
});

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/market`, {
        redirect: 'manual',
      });
      if (response.ok) {
        return response;
      }
    } catch (error) {
      // ignore until timeout
    }
    await delay(500);
  }
  throw new Error('Timed out waiting for next start to boot');
}

function ensureServerCleanup() {
  if (!server.killed) {
    server.kill();
  }
}

process.on('exit', ensureServerCleanup);
process.on('SIGINT', () => {
  ensureServerCleanup();
  process.exit(130);
});
process.on('SIGTERM', () => {
  ensureServerCleanup();
  process.exit(143);
});

(async () => {
  try {
    const response = await waitForServer();
    const html = await response.text();

    const robotsHeader = response.headers.get('x-robots-tag') ?? '';
    if (!/noindex/i.test(robotsHeader) || !/nofollow/i.test(robotsHeader) || !/noarchive/i.test(robotsHeader)) {
      throw new Error('X-Robots-Tag header is missing required directives');
    }

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

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(html)) {
        throw new Error(`Forbidden contact pattern found: ${pattern}`);
      }
    }

    const usernameMatches = [];
    const usernameRegex = /@([A-Za-z0-9_]{3,})/g;
    const allowList = new Set(['media', 'supports', 'charset', 'layer', 'keyframes', 'scope', 'import']);
    let usernameMatch;
    while ((usernameMatch = usernameRegex.exec(html)) !== null) {
      const token = usernameMatch[1].toLowerCase();
      if (!allowList.has(token)) {
        usernameMatches.push(token);
      }
    }
    if (usernameMatches.length > 0) {
      throw new Error(`Username-like mentions detected: ${usernameMatches.join(', ')}`);
    }

    if (!/meta[^>]+name="robots"[^>]+content="?[^">]*noindex/i.test(html)) {
      throw new Error('robots noindex meta tag missing');
    }

    const canonicalMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
    if (!canonicalMatch) {
      throw new Error('Canonical link for /market is missing');
    }
    const canonicalHref = canonicalMatch[1];
    const canonicalUrl = canonicalHref.startsWith('http')
      ? new URL(canonicalHref)
      : new URL(canonicalHref, baseUrl);
    if (canonicalUrl.pathname !== '/' && canonicalUrl.pathname !== '') {
      throw new Error(`Canonical link must point to root, received: ${canonicalUrl.href}`);
    }

  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    ensureServerCleanup();
  }
})();
