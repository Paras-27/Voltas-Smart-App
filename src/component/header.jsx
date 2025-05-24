// import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-blue-100 shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/img/logo.png" // 🔄 Replace with your actual logo
          alt="Voltas Logo"
          className="h-[2rem] w-auto"
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="text-blue-700 font-medium hover:underline hover:text-blue-900"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-blue-700 font-medium hover:underline hover:text-blue-900"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
