import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface JwtPayload {
  username: string;
  exp: number;
}

const HomePage = () => {
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      toast.error('You must be logged in to access this page.');
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        toast.warning('Session expired. Please log in again.');
        localStorage.removeItem('access');
        navigate('/login');
      } else {
        setUsername(decoded.username);
      }
    } catch (err) {
      console.error('Token decode error:', err);
      toast.error('Invalid session. Please log in again.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="h-[77vh] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {username} 👋</h1>
        <p className="text-gray-600 text-lg">You are successfully logged in to the Ghost Auth App!</p>
      </div>
    </div>
  );
};

export default HomePage;
