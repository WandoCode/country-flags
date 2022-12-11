import './stylesheets/main.scss'
import { useEffect } from 'react'
import useGetCountry from './hooks/useGetCountry'
import useGetCountries from './hooks/useGetCountries'

function App() {
  const [datas, loading, error] = useGetCountry('BEL')

  useEffect(() => {
    console.log(datas)
  }, [datas])

  return <div className="App"></div>
}

export default App
