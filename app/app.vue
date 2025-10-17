<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --color-primary: #0C0C0D;
  --color-bg: var(--color-primary);
  --color-surface: #0f172a;
  --color-border: #1f2937;
  --color-text: #e5e7eb;
  --color-text-muted: #94a3b8;
  --radius: 10px;
  --shadow-lg: 0 10px 30px rgba(0,0,0,.35);
}

html, body, #__nuxt {
  height: 100%;
}
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img { max-width: 100%; display: block; }
video { display: block; background: #0b1220; }
button { cursor: pointer; }

/* Utilitaires */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

/* Réactivité typographique */
h1 { font-size: clamp(1.5rem, 1rem + 2vw, 2.25rem); }
h2 { font-size: clamp(1.25rem, 1rem + 1.2vw, 1.75rem); }
h3 { font-size: 1.125rem; }
p { line-height: 1.6; }

/* Liens focus visibles */
a:focus-visible, button:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; border-radius: 6px; }

/* Scrollbar légère */
* { scrollbar-width: thin; scrollbar-color: #334155 transparent; }
*::-webkit-scrollbar { height: 10px; width: 10px; }
*::-webkit-scrollbar-thumb { background: #334155; border-radius: 8px; }
</style>
