import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  // Calculate discounted price if discount exists
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="relative">
          {product.discount && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-md">
              {product.discount}% OFF
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        
        <div className="mt-4 flex items-center">
          {discountedPrice ? (
            <>
              <span className="text-3xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="ml-3 text-lg text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Description</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Availability:</span>
            {product.stock > 0 ? (
              <span className="text-sm font-medium text-green-600">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-sm font-medium text-red-600">Out of Stock</span>
            )}
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Category:</span>
            <span className="text-sm text-gray-600 capitalize">{product.category}</span>
          </div>
        </div>
        
        {product.stock > 0 && (
          <>
            <div className="mt-8">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                  className="p-2 w-16 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                />
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="p-2 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <Button
                onClick={handleAddToCart}
                className="w-full py-3 text-base"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;