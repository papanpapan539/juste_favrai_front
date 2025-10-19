<template>
  <div class="artist-card" @click="$emit('select', artist)">
    <div class="artist-image">
      <img :src="artist.image" :alt="artist.name" />
      <div class="play-overlay">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
    <div class="artist-info">
      <h3 class="artist-name">{{ artist.name }}</h3>
      <p class="artist-tracks">{{ artist.tracks.length }} chansons</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Track {
  id: number
  name: string
  album: string
  duration: number
}

interface Artist {
  id: number
  name: string
  image: string
  tracks: Track[]
}

defineProps<{
  artist: Artist
}>()

defineEmits<{
  select: [artist: Artist]
}>()
</script>

<style scoped>
.artist-card {
  background: var(--color-surface);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.artist-card:hover {
  background: #1a1a1a;
  transform: translateY(-2px);
}

.artist-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.artist-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: #1db954;
}

.artist-card:hover .play-overlay {
  opacity: 1;
}

.artist-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--color-text);
}

.artist-tracks {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0;
}
</style>
