import { Pokemon, StarterPokemon } from '../interfaces/pokemon'

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
      .then(async response => await response.json())

    return data
  } catch (error) {
    console.log(error?.message)
  }
}
