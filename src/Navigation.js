import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="absolute top-0 w-full z-10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <span className="text-lg font-semibold">Energia <span className="text-yellow-400">Ventosa</span></span>
        <div className="space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link to="#" className="text-gray-300 hover:text-white transition-colors">Data</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
        >
          LOG OUT
        </button>
      ) : (
        <Link 
          to="/login"
          className="px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
        >
          LOG IN
        </Link>
      )}
    </nav>
  );
};

export default Navigation;