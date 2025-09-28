import React from 'react';
import { MapPin, TrendingUp, Eye } from 'lucide-react';

const HyperlocalTrends: React.FC = () => {
  const trends = [
    { id: 1, product: 'iPhone 15', sales: 156, change: '+18%', category: 'Smartphones' },
    { id: 2, product: 'AirPods Pro 2', sales: 89, change: '+12%', category: 'Audio' },
    { id: 3, product: 'iPad Air', sales: 67, change: '+25%', category: 'Tablets' },
    { id: 4, product: 'MacBook Air M2', sales: 34, change: '+8%', category: 'Laptops' },
    { id: 5, product: 'Apple Watch S9', sales: 45, change: '+15%', category: 'Wearables' }
  ];

  const insights = [
    "Smartphones are 23% more popular in your area vs. national average",
    "Audio products see peak sales on weekends",
    "Tablet demand increases during exam seasons"
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Hyperlocal Trends</h3>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <strong>Mumbai, Andheri West</strong> • Last 7 days
        </div>

        <div className="space-y-3">
          {trends.map((trend, index) => (
            <div key={trend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{trend.product}</div>
                  <div className="text-xs text-gray-500">{trend.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{trend.sales} units</div>
                <div className="text-xs text-green-600">{trend.change}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>View Full Report</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Local Insights</h3>
        </div>
        
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-blue-800">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HyperlocalTrends;