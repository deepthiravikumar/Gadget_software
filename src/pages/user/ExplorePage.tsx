import React from 'react';
import { products } from '../../data/products';
import ProductList from '../../components/products/ProductList';

const ExplorePage: React.FC = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Products</h1>
          <p className="mt-2 text-gray-600">
            Browse our full collection of premium gadgets and tech accessories.
          </p>
        </div>
        
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default ExplorePage;