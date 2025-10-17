// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  // Base publique pour GitHub Pages (définie au build via variable d'env)
  app: {
    baseURL: "/juste_favrai_front/",

    head: {
      title: 'Juste Favrai',
      titleTemplate: '%s · Juste Favrai',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'description', content: "Boutique factice d'objets de luxe: chiottes de luxe et parfums." },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#111827' },
        { property: 'og:site_name', content: 'Juste Favrai' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Juste Favrai — Objets de luxe' },
        { property: 'og:description', content: "Boutique factice d'objets de luxe: chiottes de luxe et parfums." }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  // Génération statique prête pour GitHub Pages (404.html…)
  nitro: {
    preset: 'github-pages'
  }
})