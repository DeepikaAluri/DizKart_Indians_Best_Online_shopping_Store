import React, { useState } from 'react';
import { Users, MessageSquare, Star, TrendingUp, Plus, MapPin } from 'lucide-react';

interface RetailerCircleProps {
  onAddToCart: (product: any) => void;
}

const RetailerCircle: React.FC<RetailerCircleProps> = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('peer-activity');

  const peerActivity = [
    {
      retailer: 'Sharma Electronics',
      location: 'Andheri East',
      action: 'bought',
      products: ['iPhone 15 Pro', 'AirPods Pro 2'],
      time: '2 hours ago',
      avatar: '👨‍💼'
    },
    {
      retailer: 'Tech World',
      location: 'Bandra West',
      action: 'reviewed',
      products: ['Samsung Galaxy S24'],
      time: '4 hours ago',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      retailer: 'Digital Hub',
      location: 'Powai',
      action: 'recommended',
      products: ['OnePlus 12'],
      time: '6 hours ago',
      avatar: '👨‍💻'
    }
  ];

  const trendingProducts = [
    {
      id: 401,
      name: 'iPhone 15 Pro Max',
      price: 159900,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      buyingRetailers: 23,
      avgRating: 4.8,
      profitMargin: 8.5
    },
    {
      id: 402,
      name: 'Samsung Galaxy S24 Ultra',
      price: 132999,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      buyingRetailers: 31,
      avgRating: 4.6,
      profitMargin: 12.3
    },
    {
      id: 403,
      name: 'MacBook Air M3',
      price: 114900,
      image: 'data:image/jpeg;base64,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',
      buyingRetailers: 18,
      avgRating: 4.9,
      profitMargin: 15.2
    }
  ];

  const reviews = [
    {
      retailer: 'Mobile Corner',
      product: 'iPhone 15',
      rating: 5,
      review: 'Excellent profit margins and customers love it. Sold 15 units in first week.',
      time: '1 day ago',
      helpful: 12
    },
    {
      retailer: 'Gadget Store',
      product: 'Samsung Buds2 Pro',
      rating: 4,
      review: 'Good quality but pricing could be better. Customers ask for discounts often.',
      time: '2 days ago',
      helpful: 8
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Retailer Circle</h1>
        <p className="text-gray-600">Connect with peer retailers and discover what's working for similar businesses</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('peer-activity')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'peer-activity'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Peer Activity
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'trending'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Trending Purchases
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Peer Reviews
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'peer-activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Recent Activity</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>47 retailers in your circle</span>
                </div>
              </div>

              <div className="space-y-4">
                {peerActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{activity.retailer}</span>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.action} {activity.products.join(', ')}
                        {activity.rating && (
                          <span className="ml-2 text-yellow-600">
                            {'⭐'.repeat(activity.rating)}
                          </span>
                        )}
                      </p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'trending' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">What Peers Are Buying</h2>
                <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span>Updated hourly</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Price</span>
                        <span className="font-medium">₹{product.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Buying Retailers</span>
                        <span className="font-medium text-blue-600">{product.buyingRetailers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Avg Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="font-medium">{product.avgRating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Profit Margin</span>
                        <span className="font-medium text-green-600">{product.profitMargin}%</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Peer Reviews & Recommendations</h2>
                <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
                  Write a Review
                </button>
              </div>

              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{review.product}</h3>
                        <p className="text-sm text-gray-500">by {review.retailer}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < review.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{review.review}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{review.time}</span>
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                        <span>👍</span>
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetailerCircle;