<template>
  <section>
    <h1>Chiottes de luxe</h1>
    <p class="lead">Technologie et raffinement pour un confort inégalé.</p>
    <div class="grid">
      <ProductCard
        v-for="p in products"
        :key="p.title"
        :title="p.title"
        :description="p.description"
        :image="p.image"
        :price="p.price"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Chiottes de luxe' })

const products = [
  {
    title: 'Trône Platine Série S',
    description: 'Abattant chauffant, jets massants, détection de présence, finition platine.',
    image: 'https://images.unsplash.com/photo-1582582621959-48b3b6f52aca?q=80&w=800&auto=format&fit=crop',
    price: '18 900 €'
  },
  {
    title: 'Opéra Or 24K',
    description: 'Revêtement or 24 carats, chasse silencieuse, parfum intégré.',
    image: 'https://images.unsplash.com/photo-1617093727343-374fcf5c48e4?q=80&w=800&auto=format&fit=crop',
    price: '29 500 €'
  },
  {
    title: 'Zen Onyx Pro',
    description: 'Pierre d’onyx, éclairage d’ambiance, contrôle mobile.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    price: '12 400 €'
  }
]
</script>

<style scoped>
h1 { font-size: 1.75rem; }
.lead { color: #94a3b8; margin: 0.25rem 0 1rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
section { max-width: 1200px; margin: 0 auto; }
</style>

