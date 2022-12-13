import { createRoutesFromElements, Route } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import CountryDetails from './pages/CountryDetails'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/details/:code" element={<CountryDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  { basename: '/country-flags' }
)

export default router
