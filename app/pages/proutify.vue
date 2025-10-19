<template>
  <div class="proutify">
    <!-- Header avec gradient et titre -->
    <div class="proutify-header">
      <div class="header-gradient"></div>
      <div class="header-content">
        <div class="header-info">
          <div class="playlist-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="playlist-details">
            <p class="playlist-type">PLATEFORME DE MUSIQUE</p>
            <h1 class="playlist-title">Proutify</h1>
            <p class="playlist-description">
              Découvrez la musique la plus décalée et audacieuse. 
              {{ totalTracks }} chansons organisées par {{ artists.length }} artistes.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="proutify-content">
      <!-- Barre d'outils -->
      <div class="toolbar">
        <PlayButton size="large" @click="playAll" />
        <div class="toolbar-actions">
          <button class="action-btn" @click="toggleShuffle" :class="{ active: shuffle }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16,3 21,3 21,8"/>
              <line x1="4" y1="20" x2="21" y2="3"/>
              <polyline points="21,16 21,21 16,21"/>
              <line x1="15" y1="15" x2="21" y2="21"/>
            </svg>
          </button>
          <button class="action-btn" @click="toggleRepeat" :class="{ active: repeat }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="17,1 21,5 17,9"/>
              <path d="M3,11V9a2,2 0 0,1 2,-2h14"/>
              <polyline points="7,23 3,19 7,15"/>
              <path d="M21,13v2a2,2 0 0,1 -2,2H5"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Barre de recherche -->
      <div class="search-section">
        <div class="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Rechercher des chansons, artistes ou albums..."
            class="search-input"
          />
        </div>
      </div>

      <!-- Liste des artistes -->
      <div class="artists-section">
        <h2 class="section-title">Artistes</h2>
        <div class="artists-grid">
          <ArtistCard 
            v-for="artist in artists" 
            :key="artist.id" 
            :artist="artist"
            @select="selectArtist"
          />
        </div>
      </div>

      <!-- Liste des chansons de l'artiste sélectionné -->
      <div v-if="selectedArtist" class="tracks-section">
        <div class="tracks-header">
          <div class="artist-details">
            <h2 class="section-title">{{ selectedArtist.name }}</h2>
            <p class="artist-description">{{ selectedArtist.description }}</p>
            <div class="artist-stats">
              <span class="stat">{{ selectedArtist.tracks.length }} chansons</span>
              <span class="stat">{{ selectedArtist.followers?.toLocaleString() }} abonnés</span>
            </div>
          </div>
          <button class="play-all-btn" @click="playArtist(selectedArtist)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Tout lire
          </button>
        </div>
        
        <div class="tracks-list">
          <TrackItem 
            v-for="(track, index) in selectedArtist.tracks" 
            :key="track.id"
            :track="track"
            :track-number="index + 1"
            @play="playTrack"
            @toggle-favorite="toggleFavorite"
          />
        </div>
      </div>

      <!-- Résultats de recherche -->
      <div v-if="searchQuery && searchResults.length > 0" class="search-results">
        <h2 class="section-title">Résultats de recherche</h2>
        <div class="tracks-list">
          <TrackItem 
            v-for="(track, index) in searchResults" 
            :key="track.id"
            :track="track"
            :track-number="index + 1"
            @play="playTrack"
            @toggle-favorite="toggleFavorite"
          />
        </div>
      </div>
    </div>
    
    <!-- Lecteur audio -->
    <AudioPlayer
      v-if="currentTrack"
      :current-track="currentTrack"
      :current-artist="currentArtist"
      :playlist="currentPlaylist"
      :current-track-index="currentTrackIndex"
      @track-ended="onTrackEnded"
      @track-changed="onTrackChanged"
      @play-state-changed="onPlayStateChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { artists, searchTracks, type Artist, type Track } from '~/data/music'

useHead({ title: 'Proutify - Plateforme de musique' })

// État de l'application
const shuffle = ref(false)
const repeat = ref(false)
const selectedArtist = ref<Artist | null>(null)
const searchQuery = ref('')

// État du lecteur audio
const currentTrack = ref<Track | null>(null)
const currentArtist = ref<Artist | null>(null)
const currentPlaylist = ref<Track[]>([])
const currentTrackIndex = ref(0)
const isPlaying = ref(false)

// Computed properties
const totalTracks = computed(() => {
  return artists.reduce((total, artist) => total + artist.tracks.length, 0)
})

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  return searchTracks(searchQuery.value)
})

// Méthodes
function selectArtist(artist: Artist) {
  selectedArtist.value = artist
  searchQuery.value = '' // Effacer la recherche quand on sélectionne un artiste
}

function playAll() {
  const allTracks = artists.flatMap(artist => artist.tracks)
  currentPlaylist.value = allTracks
  currentTrackIndex.value = 0
  currentTrack.value = allTracks[0]
  currentArtist.value = artists.find(artist => artist.tracks.includes(allTracks[0])) || null
}

function playArtist(artist: Artist) {
  currentPlaylist.value = artist.tracks
  currentTrackIndex.value = 0
  currentTrack.value = artist.tracks[0]
  currentArtist.value = artist
}

function playTrack(track: Track) {
  // Trouver l'artiste de cette chanson
  const artist = artists.find(a => a.tracks.includes(track))
  if (artist) {
    currentPlaylist.value = artist.tracks
    currentTrackIndex.value = artist.tracks.findIndex(t => t.id === track.id)
    currentTrack.value = track
    currentArtist.value = artist
  }
}

function toggleShuffle() {
  shuffle.value = !shuffle.value
}

function toggleRepeat() {
  repeat.value = !repeat.value
}

function toggleFavorite(track: Track) {
  console.log(`Ajout/suppression des favoris: ${track.name}`)
}

// Gestionnaires du lecteur audio
function onTrackEnded() {
  // La logique de passage à la chanson suivante est gérée dans le composant AudioPlayer
}

function onTrackChanged(index: number) {
  currentTrackIndex.value = index
  currentTrack.value = currentPlaylist.value[index]
  // Trouver l'artiste de la nouvelle chanson
  currentArtist.value = artists.find(artist => artist.tracks.includes(currentTrack.value!)) || null
}

function onPlayStateChanged(playing: boolean) {
  isPlaying.value = playing
}
</script>

<style scoped>
.proutify {
  background: var(--color-bg);
  min-height: 100vh;
  color: var(--color-text);
  padding-bottom: 100px; /* Espace pour le lecteur audio fixe */
}

.proutify-header {
  position: relative;
  background: linear-gradient(180deg, #1db954 0%, #1ed760 100%);
  padding: 2rem 1rem 1rem;
  margin-bottom: 0;
}

.header-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%);
}

.header-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.header-info {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}

.playlist-icon {
  width: 120px;
  height: 120px;
  background: #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1db954;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.playlist-type {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.playlist-title {
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 900;
  margin: 0.5rem 0;
  color: white;
}

.playlist-description {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.8);
  margin: 0;
  max-width: 600px;
}

.proutify-content {
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, var(--color-bg) 20%);
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.play-button {
  width: 56px;
  height: 56px;
  background: #1db954;
  border: none;
  border-radius: 50%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.play-button:hover {
  transform: scale(1.05);
}

.toolbar-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  color: var(--color-text);
  background: rgba(255,255,255,0.1);
}

.action-btn.active {
  color: #1db954;
}

.search-section {
  margin-bottom: 2rem;
}

.search-bar {
  position: relative;
  max-width: 400px;
}

.search-bar svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
}

.search-input {
  width: 100%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 25px;
  padding: 0.75rem 1rem 0.75rem 3rem;
  color: var(--color-text);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #1db954;
  box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.2);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

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

.tracks-section {
  margin-top: 2rem;
}

.tracks-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
}

.artist-details {
  flex: 1;
}

.artist-description {
  color: var(--color-text-muted);
  margin: 0.5rem 0;
  font-size: 0.875rem;
}

.artist-stats {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.stat {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  background: rgba(255,255,255,0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.play-all-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.play-all-btn:hover {
  border-color: var(--color-text);
  transform: scale(1.05);
}

.tracks-list {
  background: var(--color-surface);
  border-radius: 8px;
  overflow: hidden;
}

.track-item {
  display: grid;
  grid-template-columns: 40px 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--color-border);
}

.track-item:hover {
  background: rgba(255,255,255,0.05);
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
  .header-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .playlist-icon {
    width: 80px;
    height: 80px;
  }
  
  .artists-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .track-item {
    grid-template-columns: 30px 1fr auto;
    gap: 0.75rem;
  }
  
.track-actions {
  display: none;
}

.search-results {
  margin-top: 2rem;
}
}
</style>
