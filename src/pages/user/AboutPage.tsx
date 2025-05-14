import React from 'react';
import { Package, Users, Target, Award, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About GadgetHub</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your trusted destination for premium technology products since 2015.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                GadgetHub was founded with a simple but powerful vision: to make premium technology accessible to everyone. We believe that high-quality gadgets and electronics should not be exclusive or overpriced.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small store in 2015 has now grown into a trusted online destination for tech enthusiasts and everyday consumers alike. Our commitment to quality, authenticity, and excellent customer service has earned us the trust of thousands of satisfied customers.
              </p>
              <p className="text-gray-600">
                Today, we continue to expand our product range while maintaining our core values of quality, affordability, and exceptional service.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Package className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
                  <p className="mt-1 text-gray-600">
                    To provide access to high-quality technology that enhances lives, at prices everyone can afford.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Target className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                  <p className="mt-1 text-gray-600">
                    To become the most trusted destination for technology products worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-lg font-medium text-gray-900">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-lg font-medium text-gray-900">Products</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">8</div>
              <div className="text-lg font-medium text-gray-900">Years of Experience</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-lg font-medium text-gray-900">Secure Payments</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind GadgetHub's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                alt="Team member"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Alex Johnson</h3>
              <p className="text-blue-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                alt="Team member"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Sarah Chen</h3>
              <p className="text-blue-600">CTO</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
                alt="Team member"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Michael Rodriguez</h3>
              <p className="text-blue-600">Head of Operations</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <Award className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-300">
                We never compromise on the quality of our products. Every item we sell undergoes rigorous testing.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Obsession</h3>
              <p className="text-gray-300">
                Our customers are at the heart of everything we do. We're committed to providing exceptional service.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <Clock className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
              <p className="text-gray-300">
                We're always looking for ways to improve our products, services, and customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;