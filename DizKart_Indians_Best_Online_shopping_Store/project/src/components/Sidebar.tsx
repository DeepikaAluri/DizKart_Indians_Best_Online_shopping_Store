import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Bell,
  Mic, 
  Users, 
  RefreshCw, 
  Gift,
  TrendingUp,
  Calendar,
  Camera
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cart', label: 'Smart Cart', icon: ShoppingCart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'voice-search', label: 'Voice Search', icon: Mic },
    { id: 'retailer-circle', label: 'Retailer Circle', icon: Users },
    { id: 'auto-replenishment', label: 'Auto Replenishment', icon: RefreshCw },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'ar-preview', label: 'AR Shelf Preview', icon: Camera }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-16 border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
                {item.id === 'rewards' && (
                  <span className="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Quick Stats</span>
          </div>
          <div className="space-y-1 text-xs text-blue-700">
            <div>Monthly Orders: 247</div>
            <div>Profit Margin: +12.5%</div>
            <div>Discovery Rate: 23%</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;