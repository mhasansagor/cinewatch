import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft, FaStar, FaCalendarAlt, FaHeart, FaPlus } from 'react-icons/fa';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const inList = movie ? isInWatchlist(movie.id) : false;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-gray-400">Loading...</div>;
  if (!movie) return <div className="text-center mt-20 text-red-400">Movie not found.</div>;

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path, 1280)})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-48 relative z-10 pb-12">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <FaArrowLeft /> Back to Search
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img 
              src={getImageUrl(movie.poster_path, 500)} 
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl border-4 border-secondary"
            />
          </div>

          {/* Info */}
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6 text-gray-400">
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-accent" /> {movie.release_date}
              </span>
              <span className="flex items-center gap-2">
                <FaStar className="text-yellow-500" /> {movie.vote_average?.toFixed(1)} / 10
              </span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm uppercase">
                {movie.status}
              </span>
            </div>

            <div className="flex gap-3 mb-6">
              {movie.genres?.map(genre => (
                    <span 
                        key={genre.id} 
                        className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm border border-accent/30"
                    >
                        {genre.name}
                    </span>
                  ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {movie.overview || "No description available."}
            </p>

            {user && (
              <button
                onClick={() => inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg ${
                  inList 
                    ? 'bg-red-700 hover:bg-red-600 text-white' 
                    : 'bg-accent hover:bg-blue-500 text-white'
                }`}
              >
                {inList ? <FaHeart /> : <FaPlus />}
                {inList ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;