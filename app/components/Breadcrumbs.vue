<template>
  <nav aria-label="Fil d’Ariane" class="crumbs">
    <NuxtLink to="/">Accueil</NuxtLink>
    <span>/</span>
    <NuxtLink to="/parfums">Parfums</NuxtLink>
    <span>/</span>
    <span aria-current="page">Fumier de lapin</span>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.crumbs {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #94a3b8;
  margin-bottom: 1rem;
}
.crumbs a { color: #cbd5e1; text-decoration: none; }
</style>

