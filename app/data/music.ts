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
    name: "Les Prouts Symphoniques",
    image: "/logos/logo-principal.png",
    description: "Orchestre classique spécialisé dans les compositions intestinales",
    followers: 12500,
    tracks: [
      { id: 1, name: "Symphonie en Ré Majeur", album: "Concerto pour Toilettes", duration: 245, year: 2023 },
      { id: 2, name: "Mélodie du Ventre", album: "Concerto pour Toilettes", duration: 198, year: 2023 },
      { id: 3, name: "Rhapsodie Intestinale", album: "Concerto pour Toilettes", duration: 312, year: 2023 },
      { id: 4, name: "Sonate de la Digestion", album: "Concerto pour Toilettes", duration: 267, year: 2023 },
      { id: 5, name: "Concerto pour Bidet", album: "Concerto pour Toilettes", duration: 289, year: 2023 }
    ]
  },
  {
    id: 2,
    name: "DJ Flatulence",
    image: "/logos/logo-principal.png",
    description: "Pionnier de l'électro-gaz, créateur de beats révolutionnaires",
    followers: 8900,
    tracks: [
      { id: 6, name: "Bass Drop", album: "Electronic Farts", duration: 180, year: 2024 },
      { id: 7, name: "Beat Box", album: "Electronic Farts", duration: 220, year: 2024 },
      { id: 8, name: "Synthesizer Squeak", album: "Electronic Farts", duration: 195, year: 2024 },
      { id: 9, name: "Digital Wind", album: "Electronic Farts", duration: 203, year: 2024 },
      { id: 10, name: "Techno Toot", album: "Electronic Farts", duration: 178, year: 2024 }
    ]
  },
  {
    id: 3,
    name: "Le Chœur des Chiottes",
    image: "/logos/logo-principal.png",
    description: "Ensemble vocal spécialisé dans les harmonies sanitaires",
    followers: 15600,
    tracks: [
      { id: 11, name: "Chant des Égouts", album: "Voix de la Plomberie", duration: 267, year: 2023 },
      { id: 12, name: "Harmonie de la Chasse", album: "Voix de la Plomberie", duration: 234, year: 2023 },
      { id: 13, name: "Cantique du Bidet", album: "Voix de la Plomberie", duration: 289, year: 2023 },
      { id: 14, name: "Mélodie du Papier", album: "Voix de la Plomberie", duration: 245, year: 2023 },
      { id: 15, name: "Hymne à la Propreté", album: "Voix de la Plomberie", duration: 312, year: 2023 }
    ]
  },
  {
    id: 4,
    name: "Rock'n'Roll Toilette",
    image: "/logos/logo-principal.png",
    description: "Groupe de rock alternatif aux influences sanitaires",
    followers: 11200,
    tracks: [
      { id: 16, name: "Thunder in the Bowl", album: "Bathroom Rock", duration: 278, year: 2024 },
      { id: 17, name: "Electric Flush", album: "Bathroom Rock", duration: 201, year: 2024 },
      { id: 18, name: "Toilet Paper Blues", album: "Bathroom Rock", duration: 256, year: 2024 },
      { id: 19, name: "Sewer City", album: "Bathroom Rock", duration: 234, year: 2024 },
      { id: 20, name: "Drain the Swamp", album: "Bathroom Rock", duration: 289, year: 2024 }
    ]
  },
  {
    id: 5,
    name: "Jazz & Gas",
    image: "/logos/logo-principal.png",
    description: "Quartet de jazz expérimental aux sonorités gazeuses",
    followers: 7800,
    tracks: [
      { id: 21, name: "Smooth Wind", album: "Gaseous Improvisations", duration: 345, year: 2023 },
      { id: 22, name: "Bebop Burp", album: "Gaseous Improvisations", duration: 298, year: 2023 },
      { id: 23, name: "Cool Air", album: "Gaseous Improvisations", duration: 267, year: 2023 },
      { id: 24, name: "Free Form Fart", album: "Gaseous Improvisations", duration: 412, year: 2023 }
    ]
  },
  {
    id: 6,
    name: "Rap des Égouts",
    image: "/logos/logo-principal.png",
    description: "Collectif de rap underground des profondeurs urbaines",
    followers: 18900,
    tracks: [
      { id: 25, name: "Underground Flow", album: "Sewer Stories", duration: 234, year: 2024 },
      { id: 26, name: "Drain Life", album: "Sewer Stories", duration: 267, year: 2024 },
      { id: 27, name: "Pipe Dreams", album: "Sewer Stories", duration: 289, year: 2024 },
      { id: 28, name: "Flush Money", album: "Sewer Stories", duration: 245, year: 2024 },
      { id: 29, name: "Sewer King", album: "Sewer Stories", duration: 312, year: 2024 }
    ]
  },
  {
    id: 7,
    name: "louiscroixvbaton16",
    image: "/logos/logo-principal.png",
    description: "Artiste indépendant aux compositions originales",
    followers: 3200,
    tracks: [
      { id: 30, name: "fanfare 1", album: "Collection 2024", duration: 180, year: 2024, audioFile: "/chanson/louiscroixvbaton16/fanfare 1.mp3" },
      { id: 31, name: "fanfare 2", album: "Collection 2024", duration: 195, year: 2024, audioFile: "/chanson/louiscroixvbaton16/fanfare 2.mp3" },
      { id: 32, name: "faut trouver un nom 1", album: "Collection 2024", duration: 220, year: 2024, audioFile: "/chanson/louiscroixvbaton16/faut trouver un nom 1.mp3" },
      { id: 33, name: "faut trouver un nom 2", album: "Collection 2024", duration: 210, year: 2024, audioFile: "/chanson/louiscroixvbaton16/faut trouver un nom 2.mp3" }
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
