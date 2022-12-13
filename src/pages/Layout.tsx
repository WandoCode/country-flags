import { Outlet, ScrollRestoration } from 'react-router-dom'
import DarkMode from '../components/DarkMode'

function Layout() {
  return (
    <>
      <ScrollRestoration />

      <header className="header">
        <div className="header__wrapper">
          <h1 className="h1">Where in the world?</h1>
          <DarkMode />
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer"></footer>
    </>
  )
}

export default Layout
