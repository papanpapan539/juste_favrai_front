export interface Track {
  id: number
  name: string
  album: string
  duration: number
  year?: number
  audioFile?: string
}

export interface Artist {
  id: number
  name: string
  image: string
  description?: string
  tracks: Track[]
  followers?: number
}

export const artists: Artist[] = [
  {
    id: 1,
    name: "louiscroixvbaton16",
    image: "/logos/logo-principal.png",
    description: "Artiste indépendant aux compositions originales",
    followers: 3200,
    tracks: [
      { id: 1, name: "fanfare 1", album: "Collection 2024", duration: 29, year: 2024, audioFile: "/chanson/louiscroixvbaton16/fanfare 1.mp3" },
      { id: 2, name: "fanfare 2", album: "Collection 2024", duration: 34, year: 2024, audioFile: "/chanson/louiscroixvbaton16/fanfare 2.mp3" },
      { id: 3, name: "faut trouver un nom 1", album: "Collection 2024", duration: 31, year: 2024, audioFile: "/chanson/louiscroixvbaton16/faut trouver un nom 1.mp3" },
      { id: 4, name: "faut trouver un nom 2", album: "Collection 2024", duration: 14, year: 2024, audioFile: "/chanson/louiscroixvbaton16/faut trouver un nom 2.mp3" }
    ]
  }
]

export function getArtistById(id: number): Artist | undefined {
  return artists.find(artist => artist.id === id)
}

export function getTrackById(id: number): Track | undefined {
  for (const artist of artists) {
    const track = artist.tracks.find(track => track.id === id)
    if (track) return track
  }
  return undefined
}

export function getAllTracks(): Track[] {
  return artists.flatMap(artist => artist.tracks)
}


export function searchTracks(query: string): Track[] {
  const lowercaseQuery = query.toLowerCase()
  return artists.flatMap(artist => 
    artist.tracks.filter(track => 
      track.name.toLowerCase().includes(lowercaseQuery) ||
      track.album.toLowerCase().includes(lowercaseQuery) ||
      artist.name.toLowerCase().includes(lowercaseQuery)
    )
  )
}
