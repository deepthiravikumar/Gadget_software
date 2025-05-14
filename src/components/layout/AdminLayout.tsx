import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminNavbar />
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;