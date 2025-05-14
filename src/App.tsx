import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Layouts
import UserLayout from './components/layout/UserLayout';
import AdminLayout from './components/layout/AdminLayout';

// User Pages
import HomePage from './pages/user/HomePage';
import ExplorePage from './pages/user/ExplorePage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import CartPage from './pages/user/CartPage';
import LoginPage from './pages/user/LoginPage';
import SignupPage from './pages/user/SignupPage';
import AboutPage from './pages/user/AboutPage';
import SupportPage from './pages/user/SupportPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import ProductsPage from './pages/admin/ProductsPage';
import OrdersPage from './pages/admin/OrdersPage';
import UsersPage from './pages/admin/UsersPage';

// Auth Guard for protected routes
const RequireAuth = ({ children, isAdmin = false }: { children: JSX.Element, isAdmin?: boolean }) => {
  const authContext = React.useContext(
    React.createContext<{ isAuthenticated: boolean, isAdmin: boolean }>({
      isAuthenticated: false,
      isAdmin: false,
    })
  );
  
  // This is simulated - in reality we'd use useAuth() but we need to keep this component simple
  const isAuthenticated = localStorage.getItem('gadgetHubUser') !== null;
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('gadgetHubUser') || '{}') : null;
  const userIsAdmin = user?.role === 'admin';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (isAdmin && !userIsAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public routes with UserLayout */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="support" element={<SupportPage />} />
            </Route>
            
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <RequireAuth isAdmin={true}>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
            
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;