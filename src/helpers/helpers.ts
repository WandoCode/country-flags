export const formatPopulation = (population: number) => {
  return new Intl.NumberFormat('en-EN').format(population)
}
