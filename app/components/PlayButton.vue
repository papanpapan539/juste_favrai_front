<template>
  <button 
    :class="['play-button', size, { 'is-playing': isPlaying }]" 
    @click="$emit('click')"
    :aria-label="isPlaying ? 'Pause' : 'Lecture'"
  >
    <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  size?: 'small' | 'medium' | 'large'
  isPlaying?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.play-button {
  background: #1db954;
  border: none;
  border-radius: 50%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(29, 185, 84, 0.3);
}

.play-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(29, 185, 84, 0.4);
}

.play-button.is-playing {
  background: #1db954;
}

.play-button.small {
  width: 32px;
  height: 32px;
}

.play-button.medium {
  width: 48px;
  height: 48px;
}

.play-button.large {
  width: 56px;
  height: 56px;
}

.play-button:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}
</style>
