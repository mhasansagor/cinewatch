import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }
    const success = register(email, password);
    if (success) {
      navigate('/search');
    } else {
      setError('User with this email already exists.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="bg-secondary p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
        {error && <p className="bg-red-900/50 text-red-300 p-3 rounded mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-600 focus:border-accent outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-600 focus:border-accent outline-none"
            required
          />
          <button type="submit" className="w-full bg-accent hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors">
            Sign Up
          </button>
        </form>
        
        <p className="text-gray-400 text-center mt-6">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;