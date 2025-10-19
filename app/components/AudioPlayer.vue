<template>
  <div class="audio-player">
    <div class="player-info">
      <div class="track-details">
        <h4 class="track-name">{{ currentTrack?.name || 'Aucune chanson sélectionnée' }}</h4>
        <p class="artist-name">{{ currentArtist?.name || 'Sélectionnez une chanson pour commencer' }}</p>
      </div>
    </div>
    
    <div class="player-controls">
      <button 
        class="control-btn" 
        @click="previousTrack"
        :disabled="!hasPrevious"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
      </button>
      
      <button class="play-pause-btn" @click="togglePlayPause" :disabled="!currentTrack">
        <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      </button>
      
      <button 
        class="control-btn" 
        @click="nextTrack"
        :disabled="!hasNext"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
        </svg>
      </button>
    </div>
    
    <div class="player-progress">
      <span class="time">{{ formatTime(currentTime) }}</span>
      <div class="progress-bar" @click="seekTo">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <span class="time">{{ formatTime(duration) }}</span>
    </div>
    
    <audio 
      ref="audioElement"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @ended="onTrackEnded"
      @play="onPlay"
      @pause="onPause"
      @error="onError"
    />
  </div>
</template>

<script setup lang="ts">
import type { Track, Artist } from '~/data/music'

interface Props {
  currentTrack: Track | null
  currentArtist: Artist | null
  playlist: Track[]
  currentTrackIndex: number
  playMode?: 'playlist' | 'single'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'track-ended': []
  'track-changed': [index: number]
  'play-state-changed': [isPlaying: boolean]
}>()

const audioElement = ref<HTMLAudioElement>()
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const hasPrevious = computed(() => props.currentTrackIndex > 0)
const hasNext = computed(() => props.currentTrackIndex < props.playlist.length - 1)

watch(() => props.currentTrack, (newTrack) => {
  if (newTrack && newTrack.audioFile) {
    loadTrack(newTrack)
  }
}, { immediate: true })

function loadTrack(track: Track) {
  if (audioElement.value && track.audioFile) {
    audioElement.value.src = track.audioFile
    audioElement.value.load()
  }
}

function togglePlayPause() {
  if (!audioElement.value || !props.currentTrack) return
  
  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    if (props.currentTrack.audioFile) {
      audioElement.value.src = props.currentTrack.audioFile
      audioElement.value.load()
    }
    audioElement.value.play().catch(console.error)
  }
}

function previousTrack() {
  const newIndex = props.currentTrackIndex - 1
  
  if (newIndex >= 0 && props.playlist[newIndex]) {
    emit('track-changed', newIndex)
    
    // Arrêter proprement l'audio actuel avant de charger le précédent
    if (audioElement.value) {
      audioElement.value.pause()
      audioElement.value.currentTime = 0
      
      if (props.playlist[newIndex].audioFile) {
        audioElement.value.src = props.playlist[newIndex].audioFile
        audioElement.value.load()
        
        // Attendre un peu avant de lancer la lecture
        setTimeout(() => {
          if (audioElement.value) {
            audioElement.value.play().catch(console.error)
          }
        }, 100)
      }
    }
  }
}

function nextTrack() {
  const newIndex = props.currentTrackIndex + 1
  
  if (newIndex < props.playlist.length && props.playlist[newIndex]) {
    emit('track-changed', newIndex)
    
    // Arrêter proprement l'audio actuel avant de charger le suivant
    if (audioElement.value) {
      audioElement.value.pause()
      audioElement.value.currentTime = 0
      
      if (props.playlist[newIndex].audioFile) {
        audioElement.value.src = props.playlist[newIndex].audioFile
        audioElement.value.load()
        
        // Attendre un peu avant de lancer la lecture
        setTimeout(() => {
          if (audioElement.value) {
            audioElement.value.play().catch(console.error)
          }
        }, 100)
      }
    }
  }
}

function seekTo(event: MouseEvent) {
  if (!audioElement.value || !duration.value) return
  
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const newTime = percentage * duration.value
  
  audioElement.value.currentTime = newTime
  currentTime.value = newTime
}

function onLoadedMetadata() {
  if (audioElement.value) {
    duration.value = audioElement.value.duration
  }
}

function onTimeUpdate() {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
  }
}

function onPlay() {
  isPlaying.value = true
  emit('play-state-changed', true)
}

function onPause() {
  isPlaying.value = false
  emit('play-state-changed', false)
}

function onTrackEnded() {
  isPlaying.value = false
  emit('play-state-changed', false)
  emit('track-ended')
  
  // Auto-play next track only in playlist mode
  if (props.playMode === 'playlist' && hasNext.value) {
    nextTrack()
  }
}

function onError() {
  isPlaying.value = false
  emit('play-state-changed', false)
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Exposer les méthodes pour le contrôle externe
defineExpose({
  play: () => {
    if (audioElement.value) {
      audioElement.value.play()
      isPlaying.value = true
      emit('play-state-changed', true)
    }
  },
  pause: () => {
    if (audioElement.value) {
      audioElement.value.pause()
      isPlaying.value = false
      emit('play-state-changed', false)
    }
  }
})
</script>

<style scoped>
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  pointer-events: auto;
}

.player-info {
  min-width: 200px;
}

.track-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--color-text);
}

.artist-name {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  pointer-events: auto;
  position: relative;
  z-index: 1001;
}

.control-btn {
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
}

.control-btn:hover:not(:disabled) {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-btn svg {
  pointer-events: none;
}

.play-pause-btn {
  background: #1db954;
  border: none;
  color: black;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
}

.play-pause-btn:hover:not(:disabled) {
  background: #1ed760;
}

.play-pause-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.player-progress {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.time {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  min-width: 40px;
  text-align: center;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: #1db954;
  border-radius: 2px;
  transition: width 0.1s ease;
}


@media (max-width: 768px) {
  .audio-player {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
  }
  
  .player-info {
    min-width: auto;
    text-align: center;
  }
  
  .player-progress {
    width: 100%;
  }
}
</style>
