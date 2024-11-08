import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState(null);

  const VALID_EMAIL = 'green01@ventosa.energia';
  const VALID_PASSWORD = 'password01';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formData.email === VALID_EMAIL && formData.password === VALID_PASSWORD) {
        // Login successful
        const userData = { email: formData.email };
        login(userData);
        navigate('/');
      } else {
        setError('Incorrect email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }
    if (!resetEmail.includes('@')) {
      setResetStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResetStatus({ 
        type: 'success', 
        message: 'If an account exists with this email, you will receive password reset instructions shortly.' 
      });
      setResetEmail('');
    } catch (error) {
      setResetStatus({ 
        type: 'error', 
        message: 'An error occurred. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="min-h-screen flex items-center justify-center">
        {!showForgotPassword ? (
          <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mt-16">
            <h2 className="text-3xl mb-6 text-center">
              Login to <span className="text-yellow-400">Ventosa</span>
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-500 rounded text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded bg-gray-700 text-white border ${
                  error ? 'border-red-500' : 'border-gray-600'
                } focus:border-yellow-400 focus:outline-none`}
                placeholder="Enter your email"
                disabled={isLoading}
                aria-invalid={error ? 'true' : 'false'}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 rounded bg-gray-700 text-white border ${
                  error ? 'border-red-500' : 'border-gray-600'
                } focus:border-yellow-400 focus:outline-none`}
                placeholder="Enter your password"
                disabled={isLoading}
                aria-invalid={error ? 'true' : 'false'}
              />
            </div>

            <button 
              type="submit" 
              className={`w-full py-3 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-colors font-semibold flex items-center justify-center ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  LOGGING IN...
                </>
              ) : (
                'LOGIN'
              )}
            </button>

            <div className="mt-4 text-center text-gray-400">
              <button 
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="hover:text-yellow-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mt-16">
            <h2 className="text-3xl mb-6 text-center">Reset Password</h2>
            
            {resetStatus && (
              <div className={`mb-4 p-3 rounded text-sm flex items-center ${
                resetStatus.type === 'success' 
                  ? 'bg-green-900/50 border border-green-500 text-green-500'
                  : 'bg-red-900/50 border border-red-500 text-red-500'
              }`}>
                <AlertCircle className="h-4 w-4 mr-2" />
                {resetStatus.message}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="resetEmail" className="block text-gray-300 mb-2">Email</label>
              <input
                id="resetEmail"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className={`w-full py-3 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-colors font-semibold flex items-center justify-center ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  SENDING...
                </>
              ) : (
                'SEND RESET INSTRUCTIONS'
              )}
            </button>

            <div className="mt-4 text-center text-gray-400">
              <button 
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetStatus(null);
                  setResetEmail('');
                }}
                className="hover:text-yellow-400 transition-colors"
              >
                Back to login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;