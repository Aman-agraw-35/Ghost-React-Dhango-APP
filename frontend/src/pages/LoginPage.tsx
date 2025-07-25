import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import throttle from 'lodash.throttle';

interface LoginErrorResponse {
  detail?: string;
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const throttledLogin = useCallback(
    throttle(async (username: string, password: string) => {
      try {
        const res = await axios.post('https://ghost-react-dhango-app.onrender.com/api/login/', { username, password });
        localStorage.setItem('access', res.data.access);
        toast.success('Logged in successfully!');
        navigate('/');
      } catch (err) {
        const error = err as AxiosError<LoginErrorResponse>;
        console.error('Login error:', error.response?.data || error.message);
        toast.error(error.response?.data?.detail || 'Invalid credentials or server error!');
      }
    }, 3000, { trailing: false }),
    [navigate]
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    throttledLogin(username, password);
  };

  return (
    <div className="h-[77vh] flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white  bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-xl w-[20vw] max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold p-2 rounded hover:bg-gray-900 transition-all duration-200"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-700">
          New user?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
