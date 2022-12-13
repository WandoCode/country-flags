export const formatPopulation = (population: number) => {
  return new Intl.NumberFormat('en-EN').format(population)
}

export const parseSearchInput = (searchInupt: string) => {
  const searchArray = searchInupt.toLowerCase().split(' ')

  return searchArray.filter((word) => word.length > 2)
}
