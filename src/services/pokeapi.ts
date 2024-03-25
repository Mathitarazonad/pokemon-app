import { Pokemon, StarterPokemon } from '../interfaces/pokemon'
import { PokemonDetailedData } from '../interfaces/pokemonDetailed'
import { PokemonTypeDetails } from '../interfaces/pokemonTypesDetails'

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'

interface StarterPokemonsData {
  count: number
  next: string | null
  previous: string | null
  results: StarterPokemon[]
}

export const getPokemons = async ({ page, limit }: { page: number, limit?: number }) => {
  const offset = page * (limit ?? 9)

  try {
    const data: StarterPokemonsData = await fetch(POKEAPI_BASE_URL + '/pokemon/' + `?limit=${limit ?? 9}&offset=${offset}`)
      .then(async response => await response.json())
    const pokemons = [...data.results]
    return ({ pokemons, next: data.next })
  } catch (error) {
    console.log(error?.message)
    return ({ pokemons: [], next: null })
  }
}

export const getPokemonData = async (name: string) => {
  try {
    const data: Pokemon = await fetch(POKEAPI_BASE_URL + '/pokemon/' + name)
      .catch(err => { throw err })
      .then(async response => await response.json())

    return data
  } catch (error) {
    return undefined
  }
}

export const getPokemonDetailedData = async (nameOrId: string | number) => {
  try {
    let data = await fetch(POKEAPI_BASE_URL + '/pokemon-species/' + nameOrId)
      .then(async response => await response.json()) as PokemonDetailedData

    data = { ...data, flavor_text_entries: data.flavor_text_entries.filter((_, i) => i === 0) }

    return data
  } catch (error) {
    return null
  }
}

export const getTypeData = async (typeOrId: PokemonType | number) => {
  try {
    const data = await fetch(POKEAPI_BASE_URL + '/type/' + typeOrId)
      .then(async response => await response.json())

    return data as PokemonTypeDetails
  } catch (error) {
    console.log(error?.response)
  }
}
