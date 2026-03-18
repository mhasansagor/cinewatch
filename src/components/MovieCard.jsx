import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getImageUrl } from '../services/api';
import { FaHeart, FaPlus, FaTrash } from 'react-icons/fa';

const MovieCard = ({ movie, onRemove }) => {
  const { user, addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();
  const inList = isInWatchlist(movie.id);

  const handleWatchlistClick = (e) => {
    e.preventDefault(); // Prevent navigation
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="bg-secondary rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 group border border-transparent hover:border-accent relative">
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title} 
          className="w-full h-80 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
          <p className="text-gray-400 text-sm mt-1">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </p>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {user && !onRemove && (
          <button 
            onClick={handleWatchlistClick}
            className={`p-2 rounded-full ${inList ? 'bg-red-600' : 'bg-accent'} text-white shadow-md hover:opacity-80`}
            title={inList ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            {inList ? <FaHeart size={14} /> : <FaPlus size={14} />}
          </button>
        )}
      </div>

      {onRemove && (
         <div className="absolute top-2 right-2">
          <button 
            onClick={() => onRemove(movie.id)}
            className="p-2 bg-red-600 rounded-full text-white shadow-md hover:bg-red-700"
            title="Remove"
          >
            <FaTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;