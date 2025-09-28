import React from 'react';
import { Calendar, Gift, Sun, Plus } from 'lucide-react';

interface SeasonalSuggestionsProps {
  onAddToCart: (product: any) => void;
}

const SeasonalSuggestions: React.FC<SeasonalSuggestionsProps> = ({ onAddToCart }) => {
  const upcomingEvents = [
    {
      name: 'Diwali',
      date: '12 Nov 2024',
      daysLeft: 18,
      products: [
        { id: 101, name: 'LED String Lights', price: 1299, demand: 'High', image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 102, name: 'Bluetooth Speakers', price: 2999, demand: 'Medium', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ]
    },
    {
      name: 'Winter Season',
      date: 'Dec 2024',
      daysLeft: 45,
      products: [
        { id: 103, name: 'Portable Heaters', price: 4999, demand: 'High', image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 104, name: 'Winter Accessories', price: 899, demand: 'Medium', image: 'https://images.pexels.com/photos/1202726/pexels-photo-1202726.jpeg?auto=compress&cs=tinysrgb&w=200' }
      ]
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Seasonal & Festival Suggestions</h2>
      </div>

      <div className="space-y-6">
        {upcomingEvents.map((event, eventIndex) => (
          <div key={eventIndex} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  {eventIndex === 0 ? <Gift className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-purple-600">{event.daysLeft} days left</div>
                <div className="text-xs text-gray-500">to prepare</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {event.products.map((product) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{product.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">₹{product.price.toLocaleString()}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDemandColor(product.demand)}`}>
                        {product.demand}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-900 mb-2">Stock Planning Tip</h4>
        <p className="text-sm text-purple-800">
          Based on last year's data, start stocking Diwali products 3-4 weeks in advance. 
          LED lights and speakers see 300% higher demand during festival season.
        </p>
      </div>
    </div>
  );
};

export default SeasonalSuggestions;