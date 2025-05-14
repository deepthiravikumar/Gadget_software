import React from 'react';
import { Link } from 'react-router-dom';
import { orders } from '../../data/orders';
import { products } from '../../data/products';
import { users } from '../../data/users';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { DollarSign, Package, Users, ShoppingCart, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  // Calculate summary statistics
  const totalSales = orders.reduce((total, order) => total + order.finalAmount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.filter(user => user.role === 'user').length;
  
  // Get low stock products
  const lowStockProducts = products.filter(product => product.stock < 10);
  
  // Get recent orders
  const recentOrders = [...orders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  // Calculate sales by category
  const salesByCategory = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      const category = item.product.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += item.product.price * item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);
  
  // Format salesByCategory for display
  const formattedSalesByCategory = Object.entries(salesByCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalSales) * 100,
    }))
    .sort((a, b) => b.amount - a.amount);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back, Admin!</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100">Total Sales</p>
                <p className="text-2xl font-bold mt-1">${totalSales.toFixed(2)}</p>
              </div>
              <DollarSign className="h-10 w-10 text-blue-200" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-100">Orders</p>
                <p className="text-2xl font-bold mt-1">{totalOrders}</p>
              </div>
              <ShoppingCart className="h-10 w-10 text-green-200" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-100">Products</p>
                <p className="text-2xl font-bold mt-1">{totalProducts}</p>
              </div>
              <Package className="h-10 w-10 text-orange-200" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-100">Customers</p>
                <p className="text-2xl font-bold mt-1">{totalUsers}</p>
              </div>
              <Users className="h-10 w-10 text-purple-200" />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <Link to="/admin/orders">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
              
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
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => {
                      const orderUser = users.find(user => user.id === order.userId);
                      return (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {orderUser?.name || 'Unknown'}
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
          
          {/* Sales By Category */}
          <Card className="mt-8">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h2>
              
              <div className="space-y-4">
                {formattedSalesByCategory.map(({ category, amount, percentage }) => (
                  <div key={category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                      <span className="text-sm text-gray-600">${amount.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          {/* Low Stock Alert */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
                <Link to="/admin/products">
                  <Button variant="outline" size="sm">Manage</Button>
                </Link>
              </div>
              
              {lowStockProducts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-600">All products have adequate stock.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lowStockProducts.map(product => (
                    <div key={product.id} className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-orange-500 mr-3" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-600">Only {product.stock} left in stock</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
          
          {/* Quick Stats */}
          <Card className="mt-8">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">Avg. Order Value</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ${(totalSales / totalOrders).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">Pending Orders</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {orders.filter(order => order.status === 'pending').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">Products on Sale</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {products.filter(product => product.discount).length}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;