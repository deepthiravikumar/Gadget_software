import React, { useState } from 'react';
import { orders as initialOrders } from '../../data/orders';
import { users } from '../../data/users';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search, ChevronDown, ChevronUp, Filter, Eye } from 'lucide-react';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState([...initialOrders]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Apply sorting
  const sortedOrders = [...orders];
  if (sortConfig !== null) {
    sortedOrders.sort((a, b) => {
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc'
          ? a.finalAmount - b.finalAmount
          : b.finalAmount - a.finalAmount;
      }
      
      return 0;
    });
  }
  
  // Apply filters
  const filteredOrders = sortedOrders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || 
                         users.find(user => user.id === order.userId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleUpdateStatus = (orderId: string, newStatus: 'pending' | 'shipped' | 'delivered') => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };
  
  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };
  
  const getOrderUser = (userId: string) => {
    return users.find(user => user.id === userId) || { name: 'Unknown', email: 'unknown@example.com' };
  };
  
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === 'asc' ? (
      <ChevronUp size={16} className="ml-1" />
    ) : (
      <ChevronDown size={16} className="ml-1" />
    );
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="mt-1 text-gray-600">View and manage customer orders</p>
      </div>
      
      {/* Search and Filter */}
      <Card className="mb-8">
        <div className="p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th 
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('date')}
                >
                  <div className="flex items-center">
                    Date {getSortIcon('date')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('amount')}
                >
                  <div className="flex items-center">
                    Amount {getSortIcon('amount')}
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const user = getOrderUser(order.userId);
                
                return (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div>
                          <div>{user.name}</div>
                          <div className="text-gray-500 text-xs">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ${order.finalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleOrderDetails(order.id)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                        >
                          <Eye size={16} />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                    
                    {/* Order Details */}
                    {selectedOrder === order.id && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                                  Customer Information
                                </h4>
                                <p className="text-sm">
                                  <strong>Name:</strong> {user.name}
                                </p>
                                <p className="text-sm">
                                  <strong>Email:</strong> {user.email}
                                </p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                                  Payment Information
                                </h4>
                                <p className="text-sm capitalize">
                                  <strong>Method:</strong> {order.paymentMethod}
                                </p>
                                <p className="text-sm">
                                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                                  Order Summary
                                </h4>
                                <p className="text-sm">
                                  <strong>Subtotal:</strong> ${order.total.toFixed(2)}
                                </p>
                                <p className="text-sm">
                                  <strong>Tax:</strong> ${order.tax.toFixed(2)}
                                </p>
                                {order.discount > 0 && (
                                  <p className="text-sm">
                                    <strong>Discount:</strong> -${order.discount.toFixed(2)}
                                  </p>
                                )}
                                <p className="text-sm font-semibold">
                                  <strong>Total:</strong> ${order.finalAmount.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            
                            <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                              Ordered Products
                            </h4>
                            
                            <table className="min-w-full divide-y divide-gray-200 border-t border-gray-200">
                              <thead>
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                  </th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                  </th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                  </th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {order.items.map((item, index) => (
                                  <tr key={index}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                      <div className="flex items-center">
                                        <img 
                                          src={item.product.image} 
                                          alt={item.product.name}
                                          className="h-10 w-10 rounded object-cover mr-3"
                                        />
                                        <span>{item.product.name}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 text-right">
                                      ${item.product.price.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 text-right">
                                      {item.quantity}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 text-right">
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default OrdersPage;