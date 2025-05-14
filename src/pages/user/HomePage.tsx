import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../../components/products/ProductCard';
import Button from '../../components/ui/Button';
import { ArrowRight, Star, Award, Truck, Headset as HeadsetMic } from 'lucide-react';

const HomePage: React.FC = () => {
  // Get featured products (products with discount)
  const featuredProducts = products.filter(product => product.discount).slice(0, 4);
  
  // Get bestseller products (first 4 products for demo purposes)
  const bestsellerProducts = products.slice(0, 4);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-600 to-blue-400 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Premium Technology for Everyone
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Explore the latest gadgets, electronics, and tech accessories at unbeatable prices.
              </p>
              <div className="pt-4">
                <Link to="/explore">
                  <Button 
                    size="lg" 
                    className="bg-blue-600  hover:bg-blue-800 hover:text-white transition-colors duration-300"
                  >
                    Shop Now
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg"
                alt="Featured gadgets"
                className="rounded-lg shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
              <Award className="h-12 w-12 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Premium Quality</h3>
                <p className="mt-1 text-gray-600">
                  All our products are sourced from trusted brands and meet rigorous quality standards.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
              <Truck className="h-12 w-12 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Fast Delivery</h3>
                <p className="mt-1 text-gray-600">
                  Enjoy quick shipping and delivery options for all your tech needs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
              <HeadsetMic className="h-12 w-12 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">24/7 Support</h3>
                <p className="mt-1 text-gray-600">
                  Our customer service team is always available to assist you with any queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Special Offers</h2>
            <Link to="/explore" className="text-blue-600 hover:text-blue-800 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="mt-4 text-lg text-gray-300">
              Get the latest updates, deals, and exclusive offers direct to your inbox.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 flex-1 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <Button variant="primary" className="sm:rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bestsellers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
            <Link to="/explore" className="text-blue-600 hover:text-blue-800 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellerProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;