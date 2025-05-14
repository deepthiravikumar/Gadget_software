import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/ui/Button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-400" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">
            Looks like you haven't added any products to your cart yet.
          </p>
          <div className="mt-6">
            <Link to="/explore">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <Button variant="outline" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Link to="/explore" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft size={16} className="mr-1" />
                Continue Shopping
              </Link>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 space-y-6">
                {cartItems.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;