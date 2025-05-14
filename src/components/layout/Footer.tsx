import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GadgetHub</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Your one-stop destination for premium electronics and gadgets.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-600 hover:text-blue-600">
                  Explore Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 hover:text-blue-600">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Customer Care</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-blue-600">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-blue-600">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="flex-shrink-0 text-blue-600 mt-0.5" />
                <span className="ml-3 text-gray-600">
                  123 Tech Street, Digital City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="flex-shrink-0 text-blue-600" />
                <span className="ml-3 text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="flex-shrink-0 text-blue-600" />
                <span className="ml-3 text-gray-600">support@gadgethub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GadgetHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;