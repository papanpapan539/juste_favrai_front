<template>
  <section class="hero">
    <div class="inner">
      <div class="hero-head">
        <img src="/logos/logo-principal.png" alt="Logo Juste Favrai" class="hero-logo" />
        <h1>Juste Favrai</h1>
      </div>
      <p class="subtitle">Objets de luxe décalés, pensés pour les audacieux.</p>
      <div class="actions">
        <NuxtLink to="/parfums" class="btn">
          <span>Découvrir les parfums</span>
        </NuxtLink>
        <NuxtLink to="/chiottes-de-luxe" class="btn alt">
          <span>Explorer les chiottes</span>
        </NuxtLink>
      </div>
    </div>
  </section>
  <section class="categories">
    <div class="inner grid">
      <NuxtLink to="/parfums" class="cat card">
        <div class="media" aria-hidden="true">
          <img src="/parfums/parfum-fumier-de-lapin.png" alt="" />
        </div>
        <div class="body">
          <h3>Parfums</h3>
          <p>Compositions audacieuses avec vidéos de campagne.</p>
        </div>
      </NuxtLink>
      <NuxtLink to="/chiottes-de-luxe" class="cat card">
        <div class="media" aria-hidden="true">
          <img src="/chiottes/chiotte-1.png" alt="" />
        </div>
        <div class="body">
          <h3>Chiottes</h3>
          <p>Technologie avancée, confort inégalé.</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Accueil' })
</script>

<style scoped>
.hero {
  background: radial-gradient(80% 80% at 50% 0%, #1f2937 0%, var(--color-primary) 60%, var(--color-primary) 100%);
  color: #ffffff;
  padding: 4rem 1rem 3rem;
  border-bottom: 1px solid #1f2937;
}
.inner {
  max-width: 1200px;
  margin: 0 auto;
}
h1 { font-size: clamp(2rem, 1.5rem + 2vw, 3rem); line-height: 1.2; }
.hero-head { display: flex; align-items: center; gap: 0.75rem; }
.hero-logo { width: clamp(40px, 6vw, 64px); height: clamp(40px, 6vw, 64px); object-fit: contain; border-radius: 8px; background: #0b1220; box-shadow: var(--shadow-lg); }
.subtitle { color: #cbd5e1; margin-top: 0.5rem; max-width: 68ch; }
.actions { display: flex; gap: 1rem; margin-top: 1.25rem; flex-wrap: wrap; }
.btn {
  background: #ffffff; color: #0b1220; padding: 0.6rem 1rem; border-radius: 0.5rem; font-weight: 600;
}
.btn.alt { background: transparent; color: #ffffff; border: 1px solid #334155; }
.btn:hover { filter: brightness(0.98); transform: translateY(-1px); transition: all .18s ease; }
.btn.alt:hover { background: #111827; }

.categories { padding: 2rem 1rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.card { display: grid; grid-template-rows: 180px auto; border: 1px solid #1f2937; background: #0b1220; color: #e5e7eb; border-radius: 0.75rem; overflow: hidden; text-decoration: none; transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.card:hover { transform: translateY(-2px); border-color: #334155; box-shadow: var(--shadow-lg); }
.media { background: #0b1220; }
.media img { width: 100%; height: 100%; object-fit: cover; }
.body { padding: 0.9rem 1rem 1.1rem; }
.body h3 { margin-bottom: 0.25rem; }
.body p { color: #cbd5e1; }

@media (min-width: 900px) {
  .hero { padding: 5rem 1rem 4rem; }
}
</style>

