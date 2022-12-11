import './stylesheets/main.scss'
import { useEffect } from 'react'
import useGetCountry from './hooks/useGetCountry'

function App() {
  const [datas, loading, error] = useGetCountry('BEL')

  useEffect(() => {
    console.log(1)
  }, [datas])

  return <div className="App"></div>
}

export default App
