import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Calculate discounted price if discount exists
  const discountedPrice = product.discount
      ? product.price * (1 - product.discount / 100)
      : null;

  return (
      <Card className="h-full transition-all duration-300 hover:shadow-md">
        <div className="relative">
          {product.discount && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
          )}
          <Link to={`/product/${product.id}`}>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
            />
          </Link>
        </div>

        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center">
            {discountedPrice ? (
                <>
              <span className="text-lg font-bold text-gray-900">
                ₹{Math.round(discountedPrice).toLocaleString('en-IN')}
              </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                ₹{Math.round(product.price).toLocaleString('en-IN')}
              </span>
                </>
            ) : (
                <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
            )}
          </div>

          <div className="mt-2 text-sm text-gray-600">
            {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock})</span>
            ) : (
                <span className="text-red-600">Out of Stock</span>
            )}
          </div>

          <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="mt-4 w-full flex items-center justify-center"
          >
            <ShoppingCart size={18} className="mr-2" />
            {isAdded ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        </div>
      </Card>
  );
};

export default ProductCard;