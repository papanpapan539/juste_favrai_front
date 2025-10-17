<template>
  <section>
    <h1>Chiottes</h1>
    <p class="lead">Confort et prestige. Découvrez notre modèle de démonstration.</p>
    <div class="grid">
      <div class="link-card" @click="showVideo = true">
        <ProductCard
          title="Chiotte — Série 1"
          description="Finitions haut de gamme et technologie avancée."
          image="/chiottes/chiotte-1.png"
          price="18 900 €"
        />
      </div>
    </div>

    <div v-if="showVideo" class="modal" @click="showVideo = false">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="showVideo = false">&times;</button>
        <video controls autoplay poster="/chiottes/chiotte-1.png" class="modal-video">
          <source src="/chiottes/chiotte-1.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Chiottes' })
const showVideo = ref(false)
</script>

<style scoped>
h1 { font-size: 1.75rem; }
.lead { color: #94a3b8; margin: 0.25rem 0 1rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
.link-card { text-decoration: none; cursor: pointer; }
section { max-width: 1200px; margin: 0 auto; }

.modal { position: fixed; inset: 0; background: rgba(0,0,0,.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { position: relative; max-width: 90vw; max-height: 90vh; }
.close-btn { position: absolute; top: -40px; right: 0; background: rgba(255,255,255,.2); color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.modal-video { width: 100%; height: auto; max-height: 80vh; border-radius: 0.5rem; }
</style>

