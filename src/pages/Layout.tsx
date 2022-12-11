import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <header className="header">
        <h1 className="h1">Where in the world?</h1>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer"></footer>
    </>
  )
}

export default Layout
