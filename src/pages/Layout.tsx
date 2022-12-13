import { Link, Outlet, ScrollRestoration } from 'react-router-dom'
import DarkMode from '../components/DarkMode'

function Layout() {
  return (
    <>
      {/* Used with createBrowserRouter in index.js.
    When a page is loaded, the app will scroll at the top of the page */}
      <ScrollRestoration />

      <header className="header">
        <div className="header__wrapper">
          <Link to="/">
            <h1 className="h1">Where in the world?</h1>
          </Link>

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
