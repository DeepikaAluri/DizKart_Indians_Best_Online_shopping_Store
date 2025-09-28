import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Search, Plus, Globe } from 'lucide-react';

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface VoiceSearchProps {
  onAddToCart: (product: any) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onAddToCart }) => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = selectedLanguage;

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [selectedLanguage]);

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const searchResults = [
    {
      id: 301,
      name: 'Samsung Galaxy M34 5G',
      price: 18999,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.3,
      category: 'Smartphones'
    },
    {
      id: 302,
      name: 'Samsung Galaxy Buds2 Pro',
      price: 11999,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.4,
      category: 'Audio'
    },
    {
      id: 303,
      name: 'Samsung 43" Smart TV',
      price: 32999,
      image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.2,
      category: 'Electronics'
    }
  ];

  const handleVoiceSearch = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const playPronunciation = (text: string) => {
    // Simulate text-to-speech
    console.log(`Playing pronunciation for: ${text}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Voice & Vernacular Search</h1>
        <p className="text-gray-600">Search for products using voice commands in your preferred language</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Voice Search</h2>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleVoiceSearch}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>
          
          <div className="mt-4">
            {isListening ? (
              <div>
                <p className="text-lg font-medium text-red-600">Listening...</p>
                <p className="text-sm text-gray-600 mt-1">Speak now in {languages.find(l => l.code === selectedLanguage)?.name}</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium text-gray-900">Tap to speak</p>
                <p className="text-sm text-gray-600 mt-1">Say something like "मुझे Samsung का मोबाइल चाहिए"</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Or type your search query..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>

        {searchQuery && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800 font-medium">Voice Query Detected:</p>
                <p className="text-blue-900 mt-1">"{searchQuery}"</p>
              </div>
              <button 
                onClick={() => playPronunciation(searchQuery)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Common Phrases</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">"मुझे मोबाइल चाहिए"</span>
                <button 
                  onClick={() => playPronunciation("मुझे मोबाइल चाहिए")}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">"Show me headphones"</span>
                <button 
                  onClick={() => playPronunciation("Show me headphones")}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">"ಲ್ಯಾಪ್ಟಾಪ್ ತೋರಿಸಿ"</span>
                <button 
                  onClick={() => playPronunciation("ಲ್ಯಾಪ್ಟಾಪ್ ತೋರಿಸಿ")}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Language Stats</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>हिंदी queries</span>
                <span className="font-medium">67%</span>
              </div>
              <div className="flex justify-between">
                <span>English queries</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex justify-between">
                <span>Regional languages</span>
                <span className="font-medium">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {searchQuery && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <span>⭐</span>
                    <span>{product.rating}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;