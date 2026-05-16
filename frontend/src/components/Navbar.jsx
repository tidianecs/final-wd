import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Navbar() {
  const { user, isLogged, isAdmin, logout } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function isActive(path) {
    return location.pathname === path
      ? 'text-brand border-b-2 border-brand'
      : 'text-gray-400 hover:text-white'
  }

  return (
    <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-2 ml-2">
            <span className="font-bold text-white text-lg">
              Tourisme<span className="text-brand">SN</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/"             className={`text-sm font-medium pb-1 transition-colors ${isActive('/')}`}>
              Accueil
            </Link>
            <Link to="/destinations" className={`text-sm font-medium pb-1 transition-colors ${isActive('/destinations')}`}>
              Destinations
            </Link>
            {isLogged && (
              <Link to="/itineraries" className={`text-sm font-medium pb-1 transition-colors ${isActive('/itineraries')}`}>
                Mes itinéraires
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className={`text-sm font-medium pb-1 transition-colors ${isActive('/admin')}`}>
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isLogged ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-medium text-xs">
                    {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden md:block">{user?.firstName || user?.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-3 py-1.5"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    className="btn-secondary text-sm px-3 py-1.5">Connexion</Link>
                <Link to="/register" className="btn-primary  text-sm px-3 py-1.5">Inscription</Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}