<template>
  <section>
    <Breadcrumbs />
    <div class="grid">
      <div class="media">
        <video controls preload="metadata" :poster="`${base}parfums/parfum-eau-de-merde.png`" class="player">
          <source :src="`${base}parfums/parfum-eau-de-merde.mp4`" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
      <div class="details">
        <h1>Parfum — Eau de merde</h1>
        <p class="price">280 €</p>
        <p class="desc">Un accord marin étonnamment organique. Pour nez téméraires uniquement.</p>
        <div class="actions">
          <button class="btn">Ajouter au panier (factice)</button>
          <NuxtLink to="/parfums" class="btn alt">Retour</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Parfum — Eau de merde' })

const config = useRuntimeConfig()
const base = config.app.baseURL
</script>

<style scoped>
section { max-width: 1200px; margin: 0 auto; }
.grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 900px) {
  .grid { grid-template-columns: 1.2fr 1fr; }
}
.player { width: 100%; background: #0b1220; border: 1px solid #1f2937; border-radius: 0.5rem; }
.price { font-weight: 700; margin-top: 0.5rem; }
.desc { color: #94a3b8; margin: 0.5rem 0 1rem; }
.actions { display: flex; gap: 0.75rem; }
.btn { background: #ffffff; color: #0b1220; padding: 0.6rem 1rem; border-radius: 0.5rem; font-weight: 600; }
.btn.alt { background: transparent; color: #ffffff; border: 1px solid #334155; }
</style>


