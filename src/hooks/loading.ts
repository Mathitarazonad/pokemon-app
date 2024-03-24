import { useState } from 'react'

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)

  const stopLoading = () => setIsLoading(false)
  const startLoading = () => setIsLoading(true)

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
}
