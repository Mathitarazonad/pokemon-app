import { useState } from 'react'

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [maxReached, setMaxReached] = useState(false)

  const resetPagination = () => setCurrentPage(0)
  const stepToNextPage = () => setCurrentPage(prev => prev + 1)

  const changeMaxReached = () => setMaxReached(prev => !prev)

  return {
    currentPage,
    setCurrentPage,
    resetPagination,
    stepToNextPage,
    maxReached,
    changeMaxReached,
  }
}
