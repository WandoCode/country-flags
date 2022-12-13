import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found">
      <h2 className="h2">Oops</h2>
      <p>
        The adress you want to reach doesn't exist... go back to{' '}
        <Link to="/" className="link link--inline">
          Homepage
        </Link>
        .
      </p>
    </div>
  )
}

export default NotFound
