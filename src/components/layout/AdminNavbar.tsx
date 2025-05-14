import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Package, User, Menu, X, BarChart, ShoppingBag, Users, Settings } from 'lucide-react';
import Button from '../ui/Button';

const AdminNavbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 text-white">
      {/* Top navbar */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <div className="flex items-center">
          <Package className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-xl font-bold">Admin Panel</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div className={`lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <AdminNavLinks mobile onClick={() => setIsSidebarOpen(false)} />
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="px-4 flex items-center">
            <div className="flex-shrink-0">
              <User size={40} className="text-gray-300" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">Admin</div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-gray-800">
        <div className="flex items-center h-16 px-4 bg-gray-900">
          <Link to="/admin" className="flex items-center">
            <Package className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold text-white">Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-4 py-4">
            <AdminNavLinks />
          </nav>
          <div className="px-4 py-4 border-t border-gray-700">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AdminNavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const AdminNavLinks: React.FC<AdminNavLinksProps> = ({ mobile = false, onClick }) => {
  const navItems = [
    { to: '/admin', icon: <BarChart size={20} />, label: 'Dashboard' },
    { to: '/admin/products', icon: <ShoppingBag size={20} />, label: 'Products' },
    { to: '/admin/orders', icon: <Package size={20} />, label: 'Orders' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const baseClasses = mobile
    ? 'flex items-center px-3 py-2 text-base font-medium rounded-md'
    : 'flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2';

  const activeClasses = mobile
    ? 'bg-gray-900 text-white'
    : 'bg-gray-900 text-white';

  const inactiveClasses = mobile
    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
    : 'text-gray-300 hover:bg-gray-700 hover:text-white';

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`${baseClasses} ${
            window.location.pathname === item.to ? activeClasses : inactiveClasses
          }`}
          onClick={onClick}
        >
          <span className="mr-3">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default AdminNavbar;