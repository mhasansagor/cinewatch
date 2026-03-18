import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { FaBookmark } from 'react-icons/fa';

const Watchlist = () => {
  const { user, getWatchlist, removeFromWatchlist } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    // Refresh list from storage whenever component mounts or user changes
    if (user) {
      setList(getWatchlist());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleRemove = (movieId) => {
    removeFromWatchlist(movieId);
    setList(getWatchlist()); // Force re-render
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-4">
        <FaBookmark className="text-accent text-3xl" />
        <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 bg-secondary rounded-lg border border-gray-700">
          <p className="text-gray-400 text-xl mb-4">Your watchlist is empty.</p>
          <Link to="/search" className="text-accent hover:underline">
            Start adding movies!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {list.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onRemove={handleRemove} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;