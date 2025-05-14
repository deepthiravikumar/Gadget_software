import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, HelpCircle } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SupportPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    setSubmitted(true);
  };
  
  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for 1-2 day delivery.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be returned in their original packaging and in unused condition. Some exceptions apply for certain electronic items.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to select countries worldwide. International shipping rates and delivery times vary by location. You can see the available shipping options during checkout.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history.',
    },
    {
      question: 'Are the products covered by warranty?',
      answer: 'Most products come with a manufacturer\'s warranty. The warranty period varies by product and is listed on the product description page. We also offer extended warranty options on select items.',
    },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Customer Support</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help you.
          </p>
        </div>
      </section>
      
      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="p-4">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <a href="mailto:support@gadgethub.com" className="text-blue-600 hover:text-blue-800">
                  support@gadgethub.com
                </a>
              </div>
            </Card>
            
            <Card className="text-center">
              <div className="p-4">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  Our support team is available Monday-Friday, 9am-5pm EST.
                </p>
                <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800">
                  +1 (555) 123-4567
                </a>
              </div>
            </Card>
            
            <Card className="text-center">
              <div className="p-4">
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our support team in real-time for immediate assistance.
                </p>
                <Button variant="outline">
                  Start Chat
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <p className="mt-4 text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <Card padding="lg">
            {submitted ? (
              <div className="text-center py-8">
                <Send className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="mt-6"
                  variant="outline"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="name"
                    name="name"
                    label="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Input
                  id="subject"
                  name="subject"
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">
                  <Send size={16} className="mr-2" /> Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-600">
              Find quick answers to common questions about our products and services.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <div className="p-6">
                  <div className="flex items-start">
                    <HelpCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;