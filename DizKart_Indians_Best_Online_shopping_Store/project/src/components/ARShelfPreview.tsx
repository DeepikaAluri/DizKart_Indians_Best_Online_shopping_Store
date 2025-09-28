import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCcw, Download, Plus, Eye, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  dimensions: string;
  confidence: number;
}

interface ARShelfPreviewProps {
  onAddToCart: (product: Product) => void;
}

const ARShelfPreview: React.FC<ARShelfPreviewProps> = ({ onAddToCart }) => {
  const [activeMode, setActiveMode] = useState('camera');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [shelfImage, setShelfImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewGenerated, setPreviewGenerated] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const availableProducts = [
    {
      id: 701,
      name: 'iPhone 15 Pro',
      price: 134900,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Smartphones',
      dimensions: '146.6 × 70.6 × 8.25 mm',
      confidence: 95
    },
    {
      id: 702,
      name: 'Samsung Galaxy S24',
      price: 79999,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Smartphones',
      dimensions: '147.0 × 70.6 × 7.6 mm',
      confidence: 92
    },
    {
      id: 703,
      name: 'Sony WH-1000XM5',
      price: 29990,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Audio',
      dimensions: '254 × 220 × 32 mm',
      confidence: 88
    },
    {
      id: 704,
      name: 'iPad Air M2',
      price: 59900,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Tablets',
      dimensions: '247.6 × 178.5 × 6.1 mm',
      confidence: 90
    }
  ];

  const shelfTemplates = [
    {
      id: 1,
      name: 'Electronics Display Shelf',
      image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Glass Display'
    },
    {
      id: 2,
      name: 'Mobile Accessories Rack',
      image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Wall Mount'
    },
    {
      id: 3,
      name: 'Premium Product Counter',
      image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Counter Display'
    }
  ];

  const handleProductSelect = (product: Product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setShelfImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePreview = () => {
    if (selectedProducts.length === 0) return;
    
    setIsProcessing(true);
    // Simulate AR processing
    setTimeout(() => {
      setIsProcessing(false);
      setPreviewGenerated(true);
    }, 3000);
  };

  const resetPreview = () => {
    setSelectedProducts([]);
    setShelfImage(null);
    setPreviewGenerated(false);
    setIsProcessing(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera if available
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available.');
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AR Shelf Preview</h1>
        <p className="text-gray-600">Visualize how new products will look on your shop shelf before ordering</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Previews Generated</p>
              <p className="text-xl font-semibold text-gray-900">127</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Confidence Rate</p>
              <p className="text-xl font-semibold text-gray-900">94%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">New SKUs Tried</p>
              <p className="text-xl font-semibold text-gray-900">23</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-1 space-y-4">
          {/* Mode Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Capture Method</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => setActiveMode('camera')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  activeMode === 'camera'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Camera className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Live Camera</div>
                  <div className="text-sm text-gray-500">Use phone camera</div>
                </div>
              </button>

              <button
                onClick={() => setActiveMode('upload')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  activeMode === 'upload'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Upload className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Upload Photo</div>
                  <div className="text-sm text-gray-500">Use existing image</div>
                </div>
              </button>
            </div>
          </div>

          {/* Product Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Select Products</h2>
              <span className="text-sm text-gray-500">{selectedProducts.length} selected</span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availableProducts.map((product) => {
                const isSelected = selectedProducts.find(p => p.id === product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <p className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={generatePreview}
              disabled={selectedProducts.length === 0 || isProcessing}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Generate Preview</span>
                </>
              )}
            </button>

            <button
              onClick={resetPreview}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right Panel - Preview Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">AR Preview</h2>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Mobile optimized</span>
              </div>
            </div>

            {!shelfImage && activeMode === 'upload' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Shelf Photo</h3>
                <p className="text-gray-600 mb-4">Take a photo of your shelf or upload an existing image</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose Photo
                </button>
              </div>
            )}

            {!shelfImage && activeMode === 'camera' && !stream && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Camera Preview</h3>
                <p className="text-gray-600 mb-4">Point your camera at the shelf where you want to place products</p>
                <button
                  onClick={startCamera}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Camera
                </button>
              </div>
            )}

            {!shelfImage && activeMode === 'camera' && stream && (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Camera Active</span>
                  </div>
                  <button
                    onClick={() => {
                      if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        if (videoRef.current) {
                          videoRef.current.srcObject = null;
                        }
                        setStream(null);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors"
                  >
                    Stop Camera
                  </button>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center pointer-events-none">
                  <div className="text-center text-white">
                    <p className="text-lg font-medium mb-2">Camera Ready</p>
                    <p className="text-sm">Select products and generate preview</p>
                  </div>
                </div>
              </div>
            )}

            {shelfImage && !previewGenerated && (
              <div className="relative">
                <img 
                  src={shelfImage} 
                  alt="Shelf" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-lg font-medium mb-2">Shelf Detected</p>
                    <p className="text-sm">Select products and generate preview</p>
                  </div>
                </div>
              </div>
            )}

            {previewGenerated && (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={shelfImage || 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                    alt="AR Preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>AR Preview Ready</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800">Preview Generated Successfully</h3>
                      <p className="text-sm text-green-700 mt-1">
                        {selectedProducts.length} products have been virtually placed on your shelf. 
                        The arrangement looks optimal for customer visibility and accessibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                          <p className="text-xs text-gray-500">Confidence: {product.confidence}%</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Save Preview</span>
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Share with Team
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Shelf Templates */}
          {!shelfImage && (
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Or Choose a Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shelfTemplates.map((template) => (
                  <div 
                    key={template.id}
                    onClick={() => setShelfImage(template.image)}
                    className="cursor-pointer border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                    <p className="text-xs text-gray-500">{template.type}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">AR Preview Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-1">For Best Results:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Ensure good lighting when taking photos</li>
                  <li>• Keep the camera steady and at shelf level</li>
                  <li>• Include the entire shelf area in the frame</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Benefits:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Visualize product placement before ordering</li>
                  <li>• Optimize shelf space utilization</li>
                  <li>• Build confidence in trying new SKUs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARShelfPreview;