import React, { useState } from 'react';
import { RefreshCw, Clock, Package, Plus, Settings, TrendingUp, AlertTriangle, X } from 'lucide-react';

interface AutoReplenishmentProps {
  onAddToCart: (product: any) => void;
}

const AutoReplenishment: React.FC<AutoReplenishmentProps> = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('auto-orders');
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    productName: '',
    quantity: '',
    frequency: 'Weekly',
    threshold: '',
    supplier: ''
  });

  const autoOrders = [
    {
      id: 501,
      name: 'iPhone 15 Cases',
      nextOrder: '2 days',
      frequency: 'Weekly',
      quantity: 50,
      lastPrice: 899,
      trend: '+5%',
      status: 'active',
      image: 'https://images.pexels.com/photos/1034582/pexels-photo-1034582.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 502,
      name: 'USB-C Cables',
      nextOrder: '5 days',
      frequency: 'Bi-weekly',
      quantity: 100,
      lastPrice: 299,
      trend: '-2%',
      status: 'active',
      image: 'https://images.pexels.com/photos/163184/usb-cable-usb-computer-163184.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 503,
      name: 'Screen Protectors',
      nextOrder: 'Today',
      frequency: 'Weekly',
      quantity: 75,
      lastPrice: 199,
      trend: '+3%',
      status: 'pending',
      image: 'https://images.pexels.com/photos/1034582/pexels-photo-1034582.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const discoveryBoosts = [
    {
      id: 601,
      name: 'Wireless Power Banks',
      reason: 'Pairs well with your phone accessories',
      price: 1999,
      discount: 15,
      margin: 18.5,
      image: 'https://images.pexels.com/photos/4065862/pexels-photo-4065862.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 602,
      name: 'Bluetooth Car Adapters',
      reason: 'High demand in your area',
      price: 1299,
      discount: 10,
      margin: 22.3,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 603,
      name: 'Phone Ring Holders',
      reason: 'Trending accessory',
      price: 149,
      discount: 20,
      margin: 35.2,
      image: 'https://images.pexels.com/photos/1034582/pexels-photo-1034582.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'paused': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.includes('+') ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Auto Replenishment</h1>
        <p className="text-gray-600">Automate your regular purchases and discover new products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Auto-Orders</p>
              <p className="text-xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Savings</p>
              <p className="text-xl font-semibold text-gray-900">₹8,450</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">New Products Tried</p>
              <p className="text-xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('auto-orders')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'auto-orders'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Auto Orders
            </button>
            <button
              onClick={() => setActiveTab('discovery')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'discovery'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Discovery Boost
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'auto-orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Your Auto Orders</h2>
                <button
                  onClick={() => setShowSetupModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Setup New Auto Order</span>
                </button>
              </div>

              <div className="space-y-4">
                {autoOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={order.image} 
                          alt={order.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{order.name}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>Qty: {order.quantity}</span>
                            <span>₹{order.lastPrice}</span>
                            <span className={getTrendColor(order.trend)}>{order.trend}</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">Next: {order.nextOrder}</span>
                            </div>
                            <span className="text-gray-600">Every {order.frequency}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        {order.status === 'pending' && (
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Pending Actions Required</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      1 auto order needs approval due to price changes. Review and approve to maintain automation.
                    </p>
                    <button className="text-sm text-yellow-800 font-medium underline mt-2">
                      Review Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discovery' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">Discovery Boost Suggestions</h2>
                  <p className="text-sm text-gray-600 mt-1">Try new products that complement your regular orders</p>
                </div>
                <div className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  85% success rate
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {discoveryBoosts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="relative mb-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        -{product.discount}%
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-blue-600 mb-3 italic">{product.reason}</p>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price</span>
                        <span className="font-medium">₹{product.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profit Margin</span>
                        <span className="text-green-600 font-medium">{product.margin}%</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Try This Product</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-6">
                <h3 className="font-medium text-purple-900 mb-2">Discovery Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-purple-700">Products Tried:</span>
                    <span className="font-medium text-purple-900 ml-2">23 this month</span>
                  </div>
                  <div>
                    <span className="text-purple-700">Success Rate:</span>
                    <span className="font-medium text-purple-900 ml-2">85%</span>
                  </div>
                  <div>
                    <span className="text-purple-700">Revenue Impact:</span>
                    <span className="font-medium text-purple-900 ml-2">+12.3%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Setup New Auto Order Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Setup New Auto Order</h2>
              <button
                onClick={() => setShowSetupModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newOrderForm.productName}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, productName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newOrderForm.quantity}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, quantity: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={newOrderForm.frequency}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, frequency: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reorder Threshold
                </label>
                <input
                  type="number"
                  value={newOrderForm.threshold}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, threshold: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Minimum stock level"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  value={newOrderForm.supplier}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, supplier: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Supplier name"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSetupModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would typically save the new auto order
                  console.log('New auto order:', newOrderForm);
                  setNewOrderForm({
                    productName: '',
                    quantity: '',
                    frequency: 'Weekly',
                    threshold: '',
                    supplier: ''
                  });
                  setShowSetupModal(false);
                  // You could show a success message here
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Setup Auto Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoReplenishment;