import { useState } from 'react';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
  
    try {
    const data = await searchMovies(query);

    // Filter movies that have a valid year
    const filteredMovies = (data.results || []).filter(
      (movie) => movie.release_date && movie.release_date.trim() !== ""
    );

    setMovies(filteredMovies);

    if (filteredMovies.length === 0) {
      setError("No movies found.");
    }

  } catch (err) {
      setError("Failed to fetch movies. Check API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Find Your Next <span className="text-accent">Favorite</span> Movie
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
        <div className="flex bg-secondary rounded-lg overflow-hidden border border-gray-700 focus-within:border-accent transition-colors">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="flex-grow bg-transparent px-4 py-3 outline-none text-white placeholder-gray-500"
          />
          <button type="submit" className="bg-accent hover:bg-blue-500 px-6 text-white font-bold transition-colors">
            <FaSearch />
          </button>
        </div>
      </form>

      {/* Results Grid */}
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;