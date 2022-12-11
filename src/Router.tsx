import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import CountryDetails from './pages/CountryDetails'
import NotFound from './pages/NotFound'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/details/:code" element={<CountryDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
