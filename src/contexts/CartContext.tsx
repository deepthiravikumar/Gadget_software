import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { coupons as availableCoupons } from '../data/coupons';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  applyCoupon: (code: string) => boolean;
  activeCoupon: Coupon | null;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const TAX_RATE = 0.03; // 3% tax

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('gadgetHubCart');
    const savedCoupon = localStorage.getItem('gadgetHubCoupon');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    if (savedCoupon) {
      setActiveCoupon(JSON.parse(savedCoupon));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('gadgetHubCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Save coupon to localStorage
    if (activeCoupon) {
      localStorage.setItem('gadgetHubCoupon', JSON.stringify(activeCoupon));
    } else {
      localStorage.removeItem('gadgetHubCoupon');
    }
  }, [activeCoupon]);

  const addToCart = (product: Product, quantity: number) => {
    // Check if we have enough stock
    if (product.stock < quantity) {
      alert(`Sorry, only ${product.stock} items in stock.`);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Check if the total quantity exceeds stock
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          alert(`Sorry, only ${product.stock} items in stock.`);
          return prevItems;
        }
        
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setActiveCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const coupon = availableCoupons.find(c => c.code === code && c.isActive);
    if (coupon) {
      setActiveCoupon(coupon);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const couponDiscount = activeCoupon ? (subtotal * (activeCoupon.discountPercentage / 100)) : 0;
  const discount = couponDiscount;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + tax;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      tax,
      discount,
      total,
      applyCoupon,
      activeCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};