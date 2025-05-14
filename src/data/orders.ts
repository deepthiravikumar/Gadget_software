import { Order } from '../types';

export const orders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      {
        product: {
          id: '1',
          name: 'Premium Wireless Earbuds',
          price: 149.99,
          stock: 15,
          description: 'High-quality wireless earbuds with noise cancellation and 24-hour battery life.',
          image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
          category: 'audio',
        },
        quantity: 1,
      },
      {
        product: {
          id: '6',
          name: 'Wireless Charging Stand',
          price: 49.99,
          stock: 25,
          description: 'Fast wireless charging stand compatible with all Qi-enabled devices.',
          image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg',
          category: 'accessories',
        },
        quantity: 2,
      },
    ],
    total: 249.97,
    tax: 7.50,
    discount: 0,
    finalAmount: 257.47,
    status: 'delivered',
    paymentMethod: 'card',
    createdAt: '2023-09-15T10:30:00Z',
  },
  {
    id: '2',
    userId: '3',
    items: [
      {
        product: {
          id: '4',
          name: 'Gaming Laptop - 15.6"',
          price: 1499.99,
          stock: 12,
          description: 'High-performance gaming laptop with RTX graphics and RGB keyboard.',
          image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
          category: 'computer',
          discount: 5,
        },
        quantity: 1,
      },
    ],
    total: 1424.99, // After 5% discount
    tax: 42.75,
    discount: 75.00,
    finalAmount: 1467.74,
    status: 'shipped',
    paymentMethod: 'upi',
    createdAt: '2023-09-20T15:45:00Z',
  },
  {
    id: '3',
    userId: '2',
    items: [
      {
        product: {
          id: '8',
          name: 'Portable Bluetooth Speaker',
          price: 79.99,
          stock: 30,
          description: 'Waterproof portable speaker with 20-hour battery life and premium sound.',
          image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg',
          category: 'audio',
          discount: 15,
        },
        quantity: 1,
      },
    ],
    total: 67.99, // After 15% discount
    tax: 2.04,
    discount: 12.00,
    finalAmount: 70.03,
    status: 'pending',
    paymentMethod: 'cash',
    createdAt: '2023-09-25T09:15:00Z',
  },
];