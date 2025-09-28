import React, { useState } from 'react';
import { Gift, Star, Trophy, Target, Zap, Award, ChevronRight } from 'lucide-react';

const RewardsSystem: React.FC = () => {
  const [activeChallenge, setActiveChallenge] = useState(null);

  const userStats = {
    totalPoints: 12450,
    currentLevel: 'Gold',
    nextLevel: 'Platinum',
    pointsToNext: 2550,
    monthlySpending: 245000,
    newProductsTried: 8,
    referrals: 3
  };

  const activeRewards = [
    {
      id: 1,
      title: 'New Category Explorer',
      description: 'Try 3 products from a new category',
      progress: 2,
      target: 3,
      reward: '500 points + 5% cashback',
      difficulty: 'Easy',
      timeLeft: '15 days'
    },
    {
      id: 2,
      title: 'High Margin Hunter',
      description: 'Purchase 5 products with >20% margin',
      progress: 1,
      target: 5,
      reward: '1000 points + Bonus discount',
      difficulty: 'Medium',
      timeLeft: '22 days'
    },
    {
      id: 3,
      title: 'Trend Setter',
      description: 'Be first to try 2 trending products',
      progress: 0,
      target: 2,
      reward: '1500 points + Early access',
      difficulty: 'Hard',
      timeLeft: '30 days'
    }
  ];

  const rewardsHistory = [
    { date: '2024-10-20', reward: 'Category Explorer Badge', points: 500, type: 'badge' },
    { date: '2024-10-18', reward: '₹2,000 Cashback', points: 0, type: 'cashback' },
    { date: '2024-10-15', reward: 'Volume Buyer Status', points: 1000, type: 'status' },
    { date: '2024-10-12', reward: '10% Bulk Discount', points: 0, type: 'discount' }
  ];

  const availableRewards = [
    { name: '₹1,000 Cashback', cost: 2000, type: 'cashback', popular: true },
    { name: '15% Bulk Discount', cost: 1500, type: 'discount', popular: false },
    { name: 'Premium Support', cost: 3000, type: 'service', popular: false },
    { name: 'Early Access Pass', cost: 2500, type: 'access', popular: true },
    { name: '₹500 Gift Voucher', cost: 1000, type: 'voucher', popular: false },
    { name: 'Free Product Sample', cost: 800, type: 'sample', popular: false }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'badge': return '🏆';
      case 'cashback': return '💰';
      case 'status': return '⭐';
      case 'discount': return '🎯';
      default: return '🎁';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rewards & Gamification</h1>
        <p className="text-gray-600">Earn points, unlock rewards, and boost your business growth</p>
      </div>

      {/* User Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Total Points</p>
              <p className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Current Level</p>
              <p className="text-xl font-bold">{userStats.currentLevel}</p>
              <p className="text-xs text-purple-200">{userStats.pointsToNext} to {userStats.nextLevel}</p>
            </div>
            <Award className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">New Products</p>
              <p className="text-2xl font-bold">{userStats.newProductsTried}</p>
              <p className="text-xs text-green-200">This month</p>
            </div>
            <Zap className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Referrals</p>
              <p className="text-2xl font-bold">{userStats.referrals}</p>
              <p className="text-xs text-blue-200">+500 pts each</p>
            </div>
            <Star className="w-8 h-8 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Progress to {userStats.nextLevel}</h2>
          <span className="text-sm text-gray-600">{userStats.pointsToNext} points needed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((15000 - userStats.pointsToNext) / 15000) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {((15000 - userStats.pointsToNext) / 15000 * 100).toFixed(0)}% complete
        </p>
      </div>

      {/* Active Challenges */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900">Active Challenges</h2>
          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <Target className="w-4 h-4" />
            <span>Complete challenges for bonus rewards</span>
          </div>
        </div>

        <div className="space-y-4">
          {activeRewards.map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{challenge.progress}/{challenge.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{challenge.reward}</p>
                      <p className="text-xs text-gray-500">{challenge.timeLeft} left</p>
                    </div>
                  </div>
                </div>
                <button className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Rewards */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900">Redeem Points</h2>
            <div className="text-sm text-gray-600">
              Available: <span className="font-medium text-blue-600">{userStats.totalPoints.toLocaleString()}</span> points
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableRewards.map((reward, index) => (
              <div key={index} className="relative border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                {reward.popular && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{reward.name}</h3>
                  <span className="text-lg">{getTypeIcon(reward.type)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">{reward.cost.toLocaleString()}</span>
                  <button 
                    disabled={userStats.totalPoints < reward.cost}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      userStats.totalPoints >= reward.cost
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-6">Recent Rewards</h2>
          
          <div className="space-y-3">
            {rewardsHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getTypeIcon(item.type)}</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.reward}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
                {item.points > 0 && (
                  <span className="text-sm font-medium text-green-600">+{item.points} pts</span>
                )}
              </div>
            ))}
          </div>

          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 transition-colors">
            View All History
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsSystem;