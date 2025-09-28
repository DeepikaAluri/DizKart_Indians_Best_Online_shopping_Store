import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SmartCart from './components/SmartCart';
import VoiceSearch from './components/VoiceSearch';
import RetailerCircle from './components/RetailerCircle';
import AutoReplenishment from './components/AutoReplenishment';
import RewardsSystem from './components/RewardsSystem';
import ARShelfPreview from './components/ARShelfPreview';
import Notifications from './components/Notifications';
import Chatbot from './components/Chatbot';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Rajesh Kumar',
      business: 'Electronics Store, Mumbai',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      address: '123 Main St, Mumbai, India'
    };
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onAddToCart={addToCart} />;
      case 'cart':
        return <SmartCart items={cartItems} onUpdateQuantity={updateCartQuantity} />;
      case 'notifications':
        return <Notifications />;
      case 'voice-search':
        return <VoiceSearch onAddToCart={addToCart} />;
      case 'retailer-circle':
        return <RetailerCircle onAddToCart={addToCart} />;
      case 'auto-replenishment':
        return <AutoReplenishment onAddToCart={addToCart} />;
      case 'rewards':
        return <RewardsSystem />;
      case 'ar-preview':
        return <ARShelfPreview onAddToCart={addToCart} />;
      default:
        return <Dashboard onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onTabChange={setActiveTab}
        profile={profile}
        onProfileUpdate={setProfile}
      />

      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 ml-64 p-6">
          {renderContent()}
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 p-4 text-center text-gray-600">
        © 2024 DizKart. All rights reserved.
      </footer>

      <Chatbot />
    </div>
  );
}

export default App;