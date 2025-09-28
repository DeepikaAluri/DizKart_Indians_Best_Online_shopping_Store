import React, { useState } from 'react';
import { Minus, Plus, Trash2, TrendingUp, Package, AlertCircle, CheckCircle } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  costPrice?: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface SmartCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const SmartCart: React.FC<SmartCartProps> = ({ items, onUpdateQuantity }) => {
  const [showAlternatives, setShowAlternatives] = useState(false);

  const alternatives = [
    { 
      id: 201, 
      name: 'Similar Samsung Model A34', 
      price: 32999, 
      costPrice: 29500, 
      savings: 6000,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    { 
      id: 202, 
      name: 'Bundle: Phone + Case + Screen Guard', 
      price: 40999, 
      costPrice: 36500, 
      savings: 2000,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateMargin = (price: number, costPrice: number) => {
    return ((price - costPrice) / price * 100).toFixed(1);
  };

  const getTotalMargin = () => {
    const totalRevenue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCost = items.reduce((sum, item) => sum + ((item.costPrice || item.price * 0.8) * item.quantity), 0);
    return ((totalRevenue - totalCost) / totalRevenue * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Cart</h1>
        <p className="text-gray-600">Optimize your purchases with AI-powered insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add products from recommendations to see smart insights</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image || 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=200'} 
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.category || 'Electronics'}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-lg font-medium text-gray-900">₹{item.price.toLocaleString()}</span>
                          {item.costPrice && (
                            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                              {calculateMargin(item.price, item.costPrice)}% margin
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {items.length > 0 && !showAlternatives && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-yellow-800">Cost Optimization Available</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    We found alternatives that could save you up to ₹6,000 while maintaining quality.
                  </p>
                  <button 
                    onClick={() => setShowAlternatives(true)}
                    className="text-sm text-yellow-800 font-medium underline mt-2 hover:text-yellow-900"
                  >
                    View Alternatives
                  </button>
                </div>
              </div>
            </div>
          )}

          {showAlternatives && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Smart Alternatives</h2>
                <p className="text-sm text-gray-600 mt-1">Save money with these recommendations</p>
              </div>
              
              <div className="p-6 space-y-4">
                {alternatives.map((alt) => (
                  <div key={alt.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img src={alt.image} alt={alt.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-medium text-gray-900">{alt.name}</h3>
                        <p className="text-sm text-gray-600">₹{alt.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-600 font-medium">Save ₹{alt.savings.toLocaleString()}</span>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Replace
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{calculateSubtotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (18%)</span>
                <span>₹{Math.round(calculateSubtotal() * 0.18).toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{Math.round(calculateSubtotal() * 1.18).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {items.length > 0 && (
              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Proceed to Checkout
              </button>
            )}
          </div>

          {items.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Profit Insights</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Margin</span>
                  <span className="font-medium text-green-600">{getTotalMargin()}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Profit</span>
                  <span className="font-medium text-green-600">
                    ₹{Math.round(calculateSubtotal() * (parseFloat(getTotalMargin()) / 100)).toLocaleString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Above average margin for category</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartCart;