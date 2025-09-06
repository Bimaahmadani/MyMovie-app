import { Link } from "react-router-dom"
import '../css/NavBar.css'
import { useAuth } from "../contexts/AuthContext"

function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>

        {user ? (
          <>
            <span className="nav-user">{user.email}</span>
            <button onClick={signOut} className="nav-link btn-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
export default NavBar
