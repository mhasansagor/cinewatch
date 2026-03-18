import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      navigate('/search');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="bg-secondary p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded border border-gray-600 focus:border-accent outline-none"
            required
          />
          <button type="submit" className="w-full bg-accent hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors">
            Login
          </button>
        </form>
        
        <p className="text-gray-400 text-center mt-6">
          Don't have an account? <Link to="/register" className="text-accent hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;