import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './src/views/Home'
import PokemonDetails from './src/views/PokemonDetails'

export default function Router () {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='PokemonDetails' component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
