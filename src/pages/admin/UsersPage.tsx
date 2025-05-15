import React, { useState } from 'react';
import { users as initialUsers } from '../../data/users';
import { orders } from '../../data/orders';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search, User, UserPlus, Eye, X } from 'lucide-react';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState([...initialUsers]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleUserDetails = (userId: string) => {
    setSelectedUser(selectedUser === userId ? null : userId);
  };
  
  const getUserOrders = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };
  
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <Button variant="primary">
          <UserPlus size={16} className="mr-2" /> Add User
        </Button>
      </div>
      
      {/* Search */}
      <Card className="mb-8">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </Card>
      
      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const userOrders = getUserOrders(user.id);
                const totalSpent = userOrders.reduce((total, order) => total + order.finalAmount, 0);
                
                return (
                  <React.Fragment key={user.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {userOrders.length} orders (${totalSpent.toFixed(2)})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleUserDetails(user.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                    
                    {/* User Details */}
                    {selectedUser === user.id && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 bg-gray-50">
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold">User Details</h3>
                              <button
                                onClick={() => setSelectedUser(null)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X size={20} />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                                  User Information
                                </h4>
                                <p className="text-sm">
                                  <strong>Name:</strong> {user.name}
                                </p>
                                <p className="text-sm">
                                  <strong>Email:</strong> {user.email}
                                </p>
                                <p className="text-sm">
                                  <strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                                  Order Summary
                                </h4>
                                <p className="text-sm">
                                  <strong>Total Orders:</strong> {userOrders.length}
                                </p>
                                <p className="text-sm">
                                  <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
                                </p>
                                <p className="text-sm">
                                  <strong>Average Order Value:</strong> ${userOrders.length ? (totalSpent / userOrders.length).toFixed(2) : '0.00'}
                                </p>
                              </div>
                            </div>
                            
                            {userOrders.length > 0 && (
                              <>
                                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                                  Order History
                                </h4>
                                
                                <table className="min-w-full divide-y divide-gray-200 border-t border-gray-200">
                                  <thead>
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order ID
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                      </th>
                                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                      </th>
                                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {userOrders.map(order => (
                                      <tr key={order.id}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                          #{order.id}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                                          {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 text-right">
                                          ₹{order.finalAmount.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-right">
                                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                          }`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </>
                            )}
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

export default UsersPage;