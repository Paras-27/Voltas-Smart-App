import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BarChart2,
  Brain,
  Settings,
  User
} from 'lucide-react';

const Footer = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'AI', icon: Brain, path: '/ai' },
    { name: 'Energy Manager', icon: BarChart2, path: '/energy' },
    { name: 'Health', icon: Settings, path: '/pred1' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-xs ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Icon size={22} />
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
