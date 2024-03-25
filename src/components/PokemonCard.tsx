import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Pokemon } from '../interfaces/pokemon'
import { capitalize } from '../utils/texts'
import { Colors, TypeColors } from '../constants/colors'
import { memo } from 'react'
import { useNavigator } from '../hooks/navigator'

export const Component = ({ pokemon }: { pokemon: Pokemon }) => {
  const mainPokemonType = pokemon.types[0].type.name
  const { navigateTo } = useNavigator()

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => { navigateTo('PokemonDetails', { pokemon }) }}
    >
      <View style={[{ backgroundColor: TypeColors[mainPokemonType] }, styles.typeTag]}>
        <Text style={{ color: 'white', fontWeight: '600' }}>{capitalize(mainPokemonType)}</Text>
      </View>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        resizeMode='contain'
        style={{ width: '100%', aspectRatio: 1 }}
      />
      <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 18 }}>
        {capitalize(pokemon.name)}
      </Text>
      <Text style={styles.idText}>#{pokemon.id}</Text>
    </TouchableOpacity>
  )
}

export const PokemonCard = memo(Component, (prevProps, nextProps) => prevProps.pokemon.id === nextProps.pokemon.id)

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    flex: 1 / 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  typeTag: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  idText: {
    textAlign: 'center',
    color: Colors.secondaryText,
    fontSize: 16,
  },
})
