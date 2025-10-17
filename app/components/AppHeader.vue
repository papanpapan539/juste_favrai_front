<template>
  <header class="header">
    <nav class="nav">
      <NuxtLink to="/" class="brand">
        <img src="/logos/logo-principal.png" alt="Logo Juste Favrai" class="logo" />
        <span>Juste Favrai</span>
      </NuxtLink>
      <button class="menu-btn" @click="isOpen = !isOpen" aria-label="Ouvrir le menu" aria-expanded="isOpen">
        <span class="sr-only">Menu</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <ul class="links" :class="{ open: isOpen }">
        <li><NuxtLink to="/parfums" @click="isOpen = false">Parfums</NuxtLink></li>
        <li><NuxtLink to="/chiottes-de-luxe" @click="isOpen = false">Chiottes</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-primary);
  color: white;
  border-bottom: 1px solid #1f2937; /* gray-800 */
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffffff !important;
  text-decoration: none;
}
.logo { width: 32px; height: 32px; object-fit: contain; border-radius: 4px; background: #0b1220; }
.menu-btn { display: inline-flex; align-items: center; justify-content: center; background: transparent; color: #e5e7eb; border: 1px solid #334155; border-radius: 8px; padding: 0.4rem; }
.menu-btn:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }
.links {
  display: flex;
  gap: 1rem;
}
.links a {
  color: #e5e7eb; /* gray-200 */
}
.links a.router-link-active {
  color: #ffffff;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 800px) {
  .nav { gap: 0.75rem; }
  .links { 
    position: fixed; 
    top: 64px; 
    right: 12px; 
    display: none; 
    flex-direction: column; 
    background: #0f172a; 
    border: 1px solid #1f2937; 
    border-radius: 10px; 
    padding: 0.5rem; 
    box-shadow: var(--shadow-lg);
  }
  .links.open { display: flex; }
}
@media (min-width: 801px) {
  .menu-btn { display: none; }
}
</style>

