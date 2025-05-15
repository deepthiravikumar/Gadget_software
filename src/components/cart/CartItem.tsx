import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleIncrease = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  // Calculate discounted price if discount exists
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;
  
  const itemTotal = discountedPrice * quantity;
  
  return (
    <div className="flex py-6 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p className="ml-4">₹{itemTotal.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="p-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 text-gray-700">{quantity}</span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
              className="p-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex">
            <button 
              type="button" 
              onClick={handleRemove}
              className="font-medium text-red-600 hover:text-red-500 flex items-center"
            >
              <Trash2 size={16} className="mr-1" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;