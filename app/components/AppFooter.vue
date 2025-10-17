<template>
  <footer class="footer">
    <div class="inner">
      <p>© {{ new Date().getFullYear() }} Juste Favrai — Boutique factice.</p>
      <ul class="links">
        <li><NuxtLink to="/">Accueil</NuxtLink></li>
        <li><NuxtLink to="/parfums">Parfums</NuxtLink></li>
        <li><NuxtLink to="/chiottes-de-luxe">Chiottes</NuxtLink></li>
      </ul>
    </div>
  </footer>
  
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  margin-top: 3rem;
  background: var(--color-primary);
  color: #cbd5e1;
  border-top: 1px solid #1f2937;
}
.inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}
.links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}
.links a { color: #e5e7eb; }
</style>

