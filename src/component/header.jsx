import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Bolt, Brain, AlertTriangle } from 'lucide-react';

const Header = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Energy Manager', path: '/energy', icon: <Bolt size={18} /> },
    { name: 'AI Mode', path: '/ai-mode', icon: <Brain size={18} /> },
    { name: 'Fault Prediction', path: '/fault', icon: <AlertTriangle size={18} /> },
  ];

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/logo.png" // 🔄 Replace with your actual logo
          alt="Voltas Logo"
          className="h-12 w-auto"
        />
        <span className="text-xl font-semibold text-blue-600">Voltas Smart AC</span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-all ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
