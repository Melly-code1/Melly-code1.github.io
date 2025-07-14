import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Wrench, Zap, Download } from "lucide-react";

const carColors = [
  { name: "Red", value: "bg-red-500", hex: "#ef4444" },
  { name: "Blue", value: "bg-blue-500", hex: "#3b82f6" },
  { name: "Green", value: "bg-green-500", hex: "#10b981" },
  { name: "Yellow", value: "bg-yellow-500", hex: "#eab308" },
  { name: "Purple", value: "bg-purple-500", hex: "#a855f7" },
  { name: "Pink", value: "bg-pink-500", hex: "#ec4899" },
];

const carStyles = [
  { name: "Sports Car", shape: "rounded-lg" },
  { name: "Race Car", shape: "rounded-none" },
  { name: "Truck", shape: "rounded-sm" },
];

const accessories = [
  { name: "Flames", icon: "🔥" },
  { name: "Stars", icon: "⭐" },
  { name: "Lightning", icon: "⚡" },
  { name: "Hearts", icon: "❤️" },
];

export default function CarCreator() {
  const [, setLocation] = useLocation();
  const [selectedColor, setSelectedColor] = useState(carColors[0]);
  const [selectedStyle, setSelectedStyle] = useState(carStyles[0]);
  const [selectedAccessory, setSelectedAccessory] = useState(accessories[0]);

  const handleSave = () => {
    // Save car design logic would go here
    alert("Your awesome car has been saved! 🚗");
    setLocation("/");
  };

  const handleDownload = () => {
    // Create a simple SVG of the car
    const svg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <!-- Road -->
        <rect x="0" y="160" width="200" height="40" fill="#4a5568"/>
        <rect x="0" y="175" width="200" height="4" fill="#ecc94b"/>
        
        <!-- Car body -->
        <rect x="50" y="120" width="100" height="40" fill="${selectedColor.hex}" rx="${selectedStyle.shape === 'rounded-lg' ? '10' : selectedStyle.shape === 'rounded-sm' ? '5' : '0'}"/>
        
        <!-- Car windows -->
        <rect x="60" y="125" width="80" height="20" fill="#bee3f8" rx="5"/>
        
        <!-- Car wheels -->
        <circle cx="70" cy="170" r="12" fill="#2d3748"/>
        <circle cx="130" cy="170" r="12" fill="#2d3748"/>
        <circle cx="70" cy="170" r="8" fill="#4a5568"/>
        <circle cx="130" cy="170" r="8" fill="#4a5568"/>
        
        <!-- Headlights -->
        <circle cx="45" cy="140" r="4" fill="#fef5e7"/>
        
        <!-- Accessory -->
        <text x="100" y="110" text-anchor="middle" font-size="20">${selectedAccessory.icon}</text>
        
        <!-- Text -->
        <text x="100" y="50" text-anchor="middle" font-family="Arial" font-size="14" fill="black">
          My ${selectedColor.name} ${selectedStyle.name}
        </text>
      </svg>
    `;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-${selectedColor.name.toLowerCase()}-car.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-inter font-bold text-gray-800">Car Creator</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Preview */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-inter font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              Your Car Preview
            </h2>
            
            <div className="relative bg-gradient-to-b from-sky-200 to-green-200 rounded-2xl p-8 h-64 flex items-center justify-center">
              {/* Car Body */}
              <div className={`${selectedColor.value} ${selectedStyle.shape} w-32 h-16 relative shadow-lg transform hover:scale-105 transition-transform`}>
                {/* Car Windows */}
                <div className="absolute top-1 left-2 right-2 h-6 bg-blue-200 rounded-t-lg"></div>
                {/* Car Wheels */}
                <div className="absolute -bottom-2 left-2 w-6 h-6 bg-black rounded-full"></div>
                <div className="absolute -bottom-2 right-2 w-6 h-6 bg-black rounded-full"></div>
                {/* Accessory */}
                <div className="absolute -top-2 right-2 text-2xl">
                  {selectedAccessory.icon}
                </div>
              </div>
              
              {/* Road */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-600 rounded-b-2xl"></div>
              <div className="absolute bottom-2 left-4 right-4 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-inter font-semibold text-gray-700">
                {selectedColor.name} {selectedStyle.name}
              </p>
              <p className="text-sm text-gray-600">with {selectedAccessory.name}</p>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            {/* Color Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-red-600" />
                Choose Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {carColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`${color.value} w-16 h-16 rounded-full shadow-md hover:shadow-lg transition-shadow ${
                      selectedColor.name === color.name ? 'ring-4 ring-blue-400' : ''
                    }`}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-green-600" />
                Choose Style
              </h3>
              <div className="space-y-3">
                {carStyles.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedStyle(style)}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedStyle.name === style.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-inter font-semibold text-gray-700">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Add Accessories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {accessories.map((accessory) => (
                  <button
                    key={accessory.name}
                    onClick={() => setSelectedAccessory(accessory)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedAccessory.name === accessory.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{accessory.icon}</div>
                    <span className="font-inter font-semibold text-gray-700 text-sm">{accessory.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-inter font-bold py-4 rounded-2xl text-lg"
              >
                Save My Awesome Car! 🚗
              </Button>
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="px-6 py-4 rounded-2xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-inter font-bold"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}