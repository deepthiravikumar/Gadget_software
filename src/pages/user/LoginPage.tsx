import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { User, Package, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get redirect path from URL search parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password, isAdmin);
      
      if (success) {
        // Redirect to appropriate page based on role
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate(redirectTo);
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleLoginMode = () => {
    setIsAdmin(!isAdmin);
    setError('');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center">
            <Package className="h-10 w-10 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">GadgetHub</span>
          </Link>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {isAdmin ? 'Admin Login' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdmin 
              ? 'Enter your credentials to access the admin dashboard' 
              : 'Sign in to your account to continue shopping'}
          </p>
        </div>
        
        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}
            
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && (isAdmin ? <Lock size={16} className="ml-2" /> : <User size={16} className="ml-2" />)}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={toggleLoginMode}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {isAdmin 
                  ? 'Switch to Customer Login' 
                  : 'Switch to Admin Login'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
        
        {/* Demo credentials info */}
        <div className="mt-8 bg-blue-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>User:</strong> john@example.com / user123</p>
            <p><strong>Admin:</strong> admin@gadgethub.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;