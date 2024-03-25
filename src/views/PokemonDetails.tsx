import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigator } from '../hooks/navigator'
import { Pokemon } from '../interfaces/pokemon'
import { TypeColors } from '../constants/colors'
import { capitalize } from '../utils/texts'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { getPokemonDetailedData, getTypeData } from '../services/pokeapi'
import { PokemonDetailedData } from '../interfaces/pokemonDetailed'
import { getInFeetInches } from '../utils/stats'

interface RouteParams {
  pokemon: Pokemon
}

const paddingHorizontal = 20

const TypeTag = ({ type }: { type: PokemonType }) => (
  <View style={[styles.tag, { backgroundColor: TypeColors[type] }]}>
    <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
      {capitalize(type)}
    </Text>
  </View>
)

const TagsList = ({ types, tagsType }: { types: PokemonType[], tagsType: 'weaknesses' | 'strengths' }) => {
  if (types.length === 0) return null
  return (
    <View>
      <Text style={{ color: '#ccc', fontSize: 20, fontWeight: '600' }}>
        {tagsType === 'weaknesses' ? 'Weaknesses' : 'Strong against'}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, flex: 1 }}>
        {types.map(type => <TypeTag type={type} key={type} />)}
      </View>
    </View>
  )
}

export default function PokemonDetails () {
  const { route, goBack } = useNavigator()
  const pokemon = (route.params as RouteParams).pokemon
  const [pokemonDetailedData, setPokemonDetailedData] = useState<null | PokemonDetailedData>(null)
  const [weaknesses, setWeaknesses] = useState<PokemonType[]>([])
  const [strengths, setStrengths] = useState<PokemonType[]>([])

  const mainPokemonType = pokemon.types[0].type.name
  const allPokemonTypes = pokemon.types.map(type => type.type.name)
  const pokemonDescription = pokemonDetailedData?.flavor_text_entries[0]?.flavor_text.replace(/\n/g, ' ')

  useEffect(() => {
    (async () => {
      const detailedData = await getPokemonDetailedData(pokemon.name)
      setPokemonDetailedData(detailedData)

      const pokemonTypeDetailed = await getTypeData(mainPokemonType)

      const damageDoubleFrom = pokemonTypeDetailed?.damage_relations.double_damage_from
        .map(type => type.name)
        .filter(type => !allPokemonTypes.includes(type)) as PokemonType[]
      const damageDoubleTo = pokemonTypeDetailed?.damage_relations.double_damage_to
        .map(type => type.name)
        .filter(type => !allPokemonTypes.includes(type)) as PokemonType[]

      setWeaknesses(damageDoubleFrom)
      setStrengths(damageDoubleTo)
    })().catch(console.log)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: TypeColors[mainPokemonType], gap: 10 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name='chevron-back' size={20} color='white' />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{capitalize(pokemon.name)}</Text>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>#{pokemon.id}</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ width: '100%', aspectRatio: 1, position: 'relative', paddingHorizontal }}>
          <View style={styles.backgroundImageContainer}>
            <Image
              source={require('../../assets/pokemon-logo.png')}
              resizeMode='contain'
              style={{ width: '100%' }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={{ width: '100%', aspectRatio: 1 }}
            />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white', padding: paddingHorizontal, gap: 15 }}>
          <View style={styles.tagsContainer}>
            {pokemon.types.map(({ type }) => <TypeTag key={type.name} type={type.name} />)}
          </View>
          <Text style={styles.descriptionText}>
            {pokemonDescription}
          </Text>
          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <Text style={{ color: '#ccc', fontSize: 20, fontWeight: '600' }}>Height</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={styles.dataText}>{pokemon?.height / 10}m</Text>
              <Text style={styles.dataText}>{getInFeetInches(8)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <Text style={{ color: '#ccc', fontSize: 20, fontWeight: '600' }}>Weight</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={styles.dataText}>{(pokemon?.weight / 10).toFixed(1)} kg</Text>
              <Text style={styles.dataText}>{(pokemon?.weight * 4.536).toFixed(2)} lbs</Text>
            </View>
          </View>
          <TagsList types={strengths} tagsType='strengths' />
          <TagsList types={weaknesses} tagsType='weaknesses' />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal,
  },
  backgroundImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 20,
    opacity: 0.3,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  descriptionText: {
    fontStyle: 'italic',
    color: '#555',
    fontSize: 17,
  },
  dataText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 20,
    flex: 1,
  },
})
