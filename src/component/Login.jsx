import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        
        {/* Logo Placeholder */}
        <div className="flex justify-center">
          <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center">
            <img src="img/logo.jpg" alt="Voltas Logo" className="w-48 h-48" />
            {/* <span className="text-blue-500 font-bold">Logo</span> */}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-blue-700">Welcome</h2>
        <p className="text-center text-gray-600">Log in to your account</p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
