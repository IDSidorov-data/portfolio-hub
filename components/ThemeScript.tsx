// components/ThemeScript.tsx
export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  var d = document.documentElement;
  var THEMES = ['theme-aurora','theme-sakura','theme-mint'];

  function ls(k){ try { return localStorage.getItem(k); } catch(_) { return null; } }
  function detectDark(){
    var t = ls('theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    try { return window.matchMedia('(prefers-color-scheme: dark)').matches; } catch(_) { return false; }
  }
  function getVariant(){
    var v = ls('theme-variant');
    return (v && THEMES.indexOf(v) > -1) ? v : 'theme-sakura';
  }
  function has(c){ return d.classList.contains(c); }

  function apply(){
    var isDark = detectDark();
    if (isDark !== has('dark')) d.classList.toggle('dark', isDark);

    var want = isDark ? null : getVariant();
    var current = THEMES.find(has) || null;
    if (current !== want) {
      if (current) d.classList.remove(current);
      if (want) d.classList.add(want);
    }
  }

  apply();

  try {
    var mm = window.matchMedia('(prefers-color-scheme: dark)');
    if (mm.addEventListener) mm.addEventListener('change', apply);
    else if (mm.addListener) mm.addListener(apply);
    window.addEventListener('storage', function(e){
      if (e.key === 'theme' || e.key === 'theme-variant') apply();
    });
  } catch(_) {}
})();`,
      }}
    />
  );
}
