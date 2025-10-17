<template>
  <div>
    <transition name="fade">
      <div v-if="showSplash" class="splash" role="status" aria-live="polite">
        <img src="/juste_favrai_front/logos/logo-principal.png" alt="Logo Juste Favrai" class="splash-logo" @load="onLogoLoaded" />
      </div>
    </transition>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const showSplash = ref(true)
const hasLoadedOnce = useState<boolean>('hasLoadedOnce', () => false)

function hideSplash() {
  showSplash.value = false
  hasLoadedOnce.value = true
}

function onLogoLoaded() {
  // Laisse le logo au moins un court instant puis masque
  setTimeout(() => hideSplash(), 5000)
}

onMounted(() => {
  if (hasLoadedOnce.value) {
    showSplash.value = false
    return
  }
  // Sécurité: si l'image met trop de temps, masquer après délai max
  setTimeout(() => { if (showSplash.value) hideSplash() }, 5000)
})
</script>

<style scoped>
main {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.splash {
  position: fixed;
  inset: 0;
  background: var(--color-primary);
  display: grid;
  place-items: center;
  z-index: 1000;
}
.splash-logo {
  width: 90vmin; /* min(vw, vh) pour remplir l'écran de façon responsive */
  height: auto;
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.35));
  border-radius: 8px;
}
.fade-enter-active, .fade-leave-active { transition: opacity 200ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

