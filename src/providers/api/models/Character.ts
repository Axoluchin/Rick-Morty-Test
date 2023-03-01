type status = 'Alive' | 'Dead' | 'unknown'

interface source {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: status
  species: string
  type: string
  gender: string
  origin: source
  location: source
  image: string
  episode: string[]
  url: string
  created: string
}
