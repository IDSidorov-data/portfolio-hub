export default function ThemeScript() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      try {
        const ls = localStorage.getItem('theme');
        const m = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const dark = ls ? ls === 'dark' : m;
        if (dark) document.documentElement.classList.add('dark');
      } catch (_) {}
    ` }} />
  );
}