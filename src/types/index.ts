// Common Types
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
  discount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  orders?: Order[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  tax: number;
  discount: number;
  finalAmount: number;
  status: 'pending' | 'shipped' | 'delivered';
  paymentMethod: 'upi' | 'card' | 'cash';
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  isActive: boolean;
}