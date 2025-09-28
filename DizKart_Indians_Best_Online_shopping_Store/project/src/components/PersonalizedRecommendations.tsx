import React from 'react';
import { Star, TrendingUp, Plus, Heart } from 'lucide-react';

interface PersonalizedRecommendationsProps {
  onAddToCart: (product: any) => void;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ onAddToCart }) => {
  const recommendations = [
    {
      id: 1,
      name: 'Samsung Galaxy A54 5G',
      category: 'Smartphones',
      price: 38999,
      costPrice: 35500,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      trend: '+15%',
      reason: 'Based on your recent smartphone sales'
    },
    {
      id: 2,
      name: 'Sony WH-CH720N Headphones',
      category: 'Audio',
      price: 9990,
      costPrice: 8500,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.3,
      trend: '+8%',
      reason: 'Popular with customers who bought phones'
    },
    {
      id: 3,
      name: 'Realme Watch S Pro',
      category: 'Wearables',
      price: 13999,
      costPrice: 11200,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.2,
      trend: '+22%',
      reason: 'Trending in your area'
    },
    {
      id: 4,
      name: 'Mi Power Bank 3i 20000mAh',
      category: 'Accessories',
      price: 2499,
      costPrice: 2100,
      image: 'https://images.pexels.com/photos/4065862/pexels-photo-4065862.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.4,
      trend: '+5%',
      reason: 'High demand accessory'
    }
  ];

  const calculateMargin = (price: number, costPrice: number) => {
    return ((price - costPrice) / price * 100).toFixed(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">AI-Powered Recommendations</h2>
          <p className="text-sm text-gray-600 mt-1">Personalized products based on your sales pattern</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <TrendingUp className="w-4 h-4" />
          <span>92% accuracy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex space-x-3">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-green-600 ml-2">{product.trend}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Selling Price: ₹{product.price.toLocaleString()}</span>
                <span className="text-green-600 font-medium">Margin: {calculateMargin(product.price, product.costPrice)}%</span>
              </div>
              
              <p className="text-xs text-blue-600 mb-3 italic">{product.reason}</p>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-blue-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add to Cart</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;