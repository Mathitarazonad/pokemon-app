import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../constants/colors'
import { PokemonLogo } from '../components/icons/PokemonLogo'
import { AntDesign } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { getPokemonData, getPokemons } from '../services/pokeapi'
import { PokemonCard } from '../components/PokemonCard'
import { Pokemon } from '../interfaces/pokemon'
import { usePagination } from '../hooks/pagination'
import { useLoading } from '../hooks/loading'

export const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const { currentPage, stepToNextPage, maxReached, changeMaxReached } = usePagination()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const updatePokemons = async () => {
    startLoading()

    const { pokemons: starterPokemons, next: nextPageAvailable } = await getPokemons({ page: currentPage, limit: 9 })
    const pokemonsPromises = starterPokemons.map(async pokemon => await getPokemonData(pokemon.name))
    const newPokemons = await Promise.all(pokemonsPromises) as Pokemon[]
    setPokemons(prev => [...prev, ...newPokemons])

    if (nextPageAvailable === null) changeMaxReached()

    stopLoading()
  }

  useEffect(() => {
    if (maxReached) return
    (async () => {
      await updatePokemons()
    })().catch(console.log)
  }, [currentPage])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <PokemonLogo color='white' size={30} />
        <Text style={{ fontSize: 30, color: 'white', fontWeight: '600' }}>Pokedex</Text>
      </View>
      <View style={{ height: 250, paddingHorizontal: 20, position: 'relative', overflow: 'visible' }}>
        <View style={styles.backgroundImageContainer}>
          <Image
            source={require('../../assets/pokemon-logo.png')}
            resizeMode='contain'
            style={{ width: '60%' }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Text style={styles.searchText}>
            Find your favorite pokemon
          </Text>
          <View style={styles.inputContainer}>
            <AntDesign name='search1' size={20} color={Colors.secondaryText} />
            <TextInput
              placeholder='Search'
              placeholderTextColor={Colors.secondaryText}
              style={{ fontSize: 18 }}
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={pokemons}
          renderItem={({ item }: { item: Pokemon }) => <PokemonCard pokemon={item} />}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ gap: 30, overflow: 'visible', padding: 20 }}
          keyExtractor={(item: Pokemon) => String(item.id)}
          numColumns={3}
          onEndReached={() => { stepToNextPage() }}
          onEndReachedThreshold={0.1}
        />
        {isLoading &&
          <View style={{ height: 40, justifyContent: 'center' }}>
            <ActivityIndicator size='large' />
          </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.homeBackground,
    paddingTop: StatusBar.currentHeight,
    gap: 10,
    flexGrow: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
    width: '100%',
  },
  backgroundImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 20,
    opacity: 0.125,
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})
