
import React from "react";
import { BrowserRouter as  Link } from "react-router-dom";
export const Navbar = () => (
  <nav className="bg-black bg-opacity-70 text-white p-4 flex justify-between">
    <h1 className="text-xl font-bold">My Auth App</h1>
    <div className="space-x-4">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);
