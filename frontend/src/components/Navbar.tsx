import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-black bg-opacity-70 text-white p-4 flex justify-between items-center shadow-lg">
    <h1 className="text-xl font-bold">GhostApp</h1>
    <div className="space-x-4">
      <Link to="/login" className="hover:underline">Login</Link>
      <Link to="/register" className="hover:underline">Register</Link>
    </div>
  </nav>
);

export default Navbar;
