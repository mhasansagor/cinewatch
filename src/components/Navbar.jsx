import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaFilm, FaSearch, FaBookmark, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/search');
  };

  return (
    <nav className="bg-secondary border-b border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/search" className="flex items-center gap-2 text-xl font-bold text-white hover:text-accent transition-colors">
          <FaFilm className="text-accent" />
          <span>CineWatch</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/search" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <FaSearch /> <span className="hidden sm:inline">Search</span>
          </Link>
          
          {user ? (
            <>
              <Link to="/watchlist" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <FaBookmark /> <span className="hidden sm:inline">Watchlist</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg transition-colors"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-accent hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg transition-colors">
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;