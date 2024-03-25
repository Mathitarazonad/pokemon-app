export interface PokemonDetailedData {
  base_happiness: number
  capture_rate: number
  color: Color
  egg_groups: EggGroup[]
  evolution_chain: EvolutionChain
  evolves_from_species: EvolvesFromSpecies
  flavor_text_entries: FlavorTextEntry[]
}

interface Color {
  name: string
  url: string
}

interface EggGroup {
  name: string
  url: string
}

interface EvolutionChain {
  url: string
}

interface EvolvesFromSpecies {
  name: string
  url: string
}

interface FlavorTextEntry {
  flavor_text: string
  language: Language
}

interface Language {
  name: string
  url: string
}
