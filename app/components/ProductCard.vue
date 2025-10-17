<template>
  <article class="card" tabindex="0">
    <img :src="image" :alt="title" class="cover" @click.stop.prevent="$emit('image-click')" />
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="desc">{{ description }}</p>
      <div class="price">{{ price }}</div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{ 
  title: string; 
  description: string; 
  image: string; 
  price: string; 
}>()
defineEmits<{ (e: 'image-click'): void }>()
</script>

<style scoped>
.card {
  display: grid;
  grid-template-rows: 180px 1fr;
  border: 1px solid #1f2937;
  background: #0b1220;
  color: #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content { padding: 0.75rem 1rem 1rem; }
.title { font-weight: 600; margin-bottom: 0.25rem; }
.desc { font-size: 0.9rem; color: #cbd5e1; min-height: 2.6em; }
.price { margin-top: 0.5rem; font-weight: 700; }

.card:hover, .card:focus-visible {
  transform: translateY(-2px);
  border-color: #334155;
  box-shadow: var(--shadow-lg);
}
</style>

