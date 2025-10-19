<template>
  <div class="track-item" @click="handlePlay">
    <div class="track-number">{{ trackNumber }}</div>
    <div class="track-info">
      <div class="track-name">{{ track.name }}</div>
      <div class="track-album">{{ track.album }}</div>
    </div>
    <div class="track-duration">{{ formatDuration(track.duration) }}</div>
    <div class="track-actions">
      <button class="track-action-btn" @click.stop="$emit('toggle-favorite', track)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Track } from '~/data/music'

const props = defineProps<{
  track: Track
  trackNumber: number
}>()

const emit = defineEmits<{
  play: [track: Track]
  'toggle-favorite': [track: Track]
}>()

function handlePlay() {
  emit('play', props.track)
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.track-item {
  display: grid;
  grid-template-columns: 40px 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--color-border);
  position: relative;
  z-index: 10;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: auto;
  touch-action: manipulation;
}

.track-item:hover {
  background: rgba(255,255,255,0.1);
  transform: translateX(4px);
}

.track-item:last-child {
  border-bottom: none;
}

.track-number {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  text-align: center;
}

.track-info {
  min-width: 0;
}

.track-name {
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-album {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-duration {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.track-actions {
  display: flex;
  gap: 0.5rem;
}

.track-action-btn {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  padding: 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.track-action-btn:hover {
  color: var(--color-text);
  background: rgba(255,255,255,0.1);
}

@media (max-width: 768px) {
  .track-item {
    grid-template-columns: 30px 1fr auto;
    gap: 0.75rem;
  }
  
  .track-actions {
    display: none;
  }
}
</style>
