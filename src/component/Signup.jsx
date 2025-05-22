import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center">
          <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center">
            <img src="img/logo.jpg" alt="Voltas Logo" className="w-48 h-48" />
            {/* <span className="text-blue-500 font-bold">Logo</span> */}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Create Account</h2>
        <p className="text-center text-gray-600 mb-6">Sign up to use Voltas Smart AC</p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 font-semibold hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
