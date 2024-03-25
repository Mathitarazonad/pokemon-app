import { useNavigation, useRoute } from '@react-navigation/native'

export const useNavigator = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const navigateTo = (route: string, params: unknown) => {
    navigation.navigate(route, params)
  }

  const goBack = () => navigation.goBack()

  return {
    navigateTo,
    goBack,
    route,
  }
}
