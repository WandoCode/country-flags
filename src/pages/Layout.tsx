import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <h1 className="h1">Where in the world?</h1>
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
