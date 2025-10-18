<template>
  <section>
    <h1>Parfums</h1>
    <p class="lead">Découvrez nos créations audacieuses.</p>
    <div class="grid">
      <NuxtLink to="/parfums/fumier-de-lapin" class="link-card">
        <ProductCard
          title="Parfum — Fumier de lapin"
          description="Accord animal singulier, pour audacieux seulement."
          :image="`${base}parfums/parfum-fumier-de-lapin.png`"
          price="320 €"
          @image-click="openVideo(`${base}parfums/parfum-fumier-de-lapin.mp4`)"
        />
      </NuxtLink>
      <NuxtLink to="/parfums/eau-de-merde" class="link-card">
        <ProductCard
          title="Parfum — Eau de merde"
          description="Un accord marin étonnamment organique. Pour nez téméraires."
          :image="`${base}parfums/parfum-eau-de-merde.png`"
          price="280 €"
          @image-click="openVideo(`${base}parfums/parfum-eau-de-merde.mp4`)"
        />
      </NuxtLink>
      <NuxtLink to="/parfums/prout" class="link-card">
        <ProductCard
          title="Parfum — Prout"
          description="Une fragrance audacieuse qui ne laisse personne indifférent."
          :image="`${base}parfums/parfum-prout.png`"
          price="250 €"
          @image-click="openVideo(`${base}parfums/parfum-prout.mp4`)"
        />
      </NuxtLink>
      <NuxtLink to="/parfums/urine" class="link-card">
        <ProductCard
          title="Parfum — Urine"
          description="Un parfum controversé pour les amateurs d'extrême."
          :image="`${base}parfums/parfum-urine.png`"
          price="300 €"
          @image-click="openVideo(`${base}parfums/parfum-urine.mp4`)"
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
useHead({ title: 'Parfums' })

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

