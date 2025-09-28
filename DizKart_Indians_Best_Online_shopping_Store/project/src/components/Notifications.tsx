import React from 'react';
import { Bell, Package, TrendingUp, AlertCircle } from 'lucide-react';

const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #12345 has been delivered successfully.',
      time: '2 hours ago',
      icon: Package,
      unread: true
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Flash Sale Alert',
      message: '50% off on electronics! Limited time offer.',
      time: '4 hours ago',
      icon: TrendingUp,
      unread: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Inventory Low',
      message: 'Samsung Galaxy S23 stock is running low.',
      time: '1 day ago',
      icon: AlertCircle,
      unread: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full">
              {notifications.filter(n => n.unread).length} new
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  notification.unread ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'order' ? 'bg-green-100 text-green-600' :
                    notification.type === 'promotion' ? 'bg-orange-100 text-orange-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
