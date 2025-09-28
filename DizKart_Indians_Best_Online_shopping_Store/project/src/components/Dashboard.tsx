import React from 'react';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import HyperlocalTrends from './HyperlocalTrends';
import SeasonalSuggestions from './SeasonalSuggestions';

interface DashboardProps {
  onAddToCart: (product: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAddToCart }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Rajesh!</h1>
        <p className="text-gray-600">Here are your personalized insights and recommendations for today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PersonalizedRecommendations onAddToCart={onAddToCart} />
        </div>
        <div>
          <HyperlocalTrends />
        </div>
      </div>

      <SeasonalSuggestions onAddToCart={onAddToCart} />
    </div>
  );
};

export default Dashboard;