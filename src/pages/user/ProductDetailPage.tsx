import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import ProductDetail from '../../components/products/ProductDetail';
import ProductCard from '../../components/products/ProductCard';
import { ArrowLeft } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  useEffect(() => {
    // Update product if ID changes
    setProduct(products.find(p => p.id === id));
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Product Not Found</h2>
        <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        <Link to="/explore" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/explore" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </Link>
        </div>
        
        <ProductDetail product={product} />
        
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;