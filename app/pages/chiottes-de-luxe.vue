<template>
  <section>
    <h1>Chiottes de luxe</h1>
    <p class="lead">Technologie et raffinement pour un confort inégalé.</p>
    <div class="grid">
      <NuxtLink to="/chiottes-de-luxe/serie-1" class="link-card">
        <ProductCard
          title="Chiotte — Série 1"
          description="Finitions haut de gamme et technologie avancée."
          :image="`${base}chiottes/chiotte-1.png`"
          price="18 900 €"
          @image-click="openVideo(`${base}chiottes/chiotte-1.mp4`)"
        />
      </NuxtLink>
      <NuxtLink to="/chiottes-de-luxe/serie-2" class="link-card">
        <ProductCard
          title="Chiotte — Série 2"
          description="Innovation et confort réunis dans un design exceptionnel."
          :image="`${base}chiottes/chiotte-2.png`"
          price="22 500 €"
          @image-click="openVideo(`${base}chiottes/chiotte-2.mp4`)"
        />
      </NuxtLink>
    </div>

    <!-- Modal vidéo -->
    <div v-if="showVideo" class="modal" @click="closeVideo" @keydown.esc="closeVideo" tabindex="-1" ref="modalRef">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeVideo">&times;</button>
        <video controls autoplay class="modal-video">
          <source :src="currentVideoSrc" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Chiottes de luxe' })

const config = useRuntimeConfig()
const base = config.app.baseURL

const showVideo = ref(false)
const currentVideoSrc = ref('')
const modalRef = ref<HTMLDivElement | null>(null)

function openVideo(src: string) {
  currentVideoSrc.value = src
  showVideo.value = true
  nextTick(() => modalRef.value?.focus())
}

function closeVideo() {
  showVideo.value = false
  currentVideoSrc.value = ''
}
</script>

<style scoped>
h1 { font-size: 1.75rem; }
.lead { color: #94a3b8; margin: 0.25rem 0 1rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
.link-card { text-decoration: none; cursor: pointer; }
section { max-width: 1200px; margin: 0 auto; }

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-video {
  width: 100%;
  height: auto;
  max-height: 80vh;
  border-radius: 0.5rem;
}
</style>