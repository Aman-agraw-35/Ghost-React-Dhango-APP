import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import './App.css'
const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?technology")' }}>
      <Navbar />
      <main className="flex-grow flex justify-center items-center p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
