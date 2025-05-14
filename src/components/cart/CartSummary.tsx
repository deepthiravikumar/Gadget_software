import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const CartSummary: React.FC = () => {
  const { subtotal, tax, discount, total, applyCoupon, activeCoupon, removeCoupon, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash'>('card');
  const navigate = useNavigate();
  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    const success = applyCoupon(couponCode.trim().toUpperCase());
    if (!success) {
      setCouponError('Invalid or expired coupon code');
    } else {
      setCouponError('');
      setCouponCode('');
    }
  };
  
  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setCouponError('');
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
      return;
    }
    
    // In a real app, this would process the payment
    // For demo purposes, we'll just clear the cart and show a success message
    alert('Your order has been placed successfully!');
    clearCart();
    navigate('/');
  };
  
  return (
    <Card className="sticky top-20">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600 font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (3%)</span>
          <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 my-3 pt-3">
          <div className="flex justify-between">
            <span className="text-gray-900 font-semibold">Total</span>
            <span className="text-gray-900 font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        {activeCoupon ? (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Coupon applied: {activeCoupon.code}
                </p>
                <p className="text-xs text-green-700">
                  {activeCoupon.discountPercentage}% discount
                </p>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex space-x-2">
              <Input
                id="coupon"
                name="coupon"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                error={couponError}
                className="mb-0"
              />
              <Button
                onClick={handleApplyCoupon}
                variant="outline"
                className="whitespace-nowrap"
              >
                Apply
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Payment Method</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="upi"
                name="paymentMethod"
                type="radio"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">
                UPI
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="card"
                name="paymentMethod"
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                Credit/Debit Card
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="cash"
                name="paymentMethod"
                type="radio"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleCheckout}
          className="w-full mt-6"
          size="lg"
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  );
};

export default CartSummary;