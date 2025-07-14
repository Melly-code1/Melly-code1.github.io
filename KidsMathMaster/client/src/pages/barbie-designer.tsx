import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Sparkles, Heart, Download } from "lucide-react";

const hairColors = [
  { name: "Blonde", value: "bg-yellow-400", hex: "#facc15" },
  { name: "Brown", value: "bg-amber-700", hex: "#a16207" },
  { name: "Black", value: "bg-gray-900", hex: "#111827" },
  { name: "Red", value: "bg-red-600", hex: "#dc2626" },
  { name: "Pink", value: "bg-pink-400", hex: "#f472b6" },
  { name: "Purple", value: "bg-purple-500", hex: "#a855f7" },
];

const outfitColors = [
  { name: "Pink", value: "bg-pink-500", hex: "#ec4899" },
  { name: "Purple", value: "bg-purple-500", hex: "#a855f7" },
  { name: "Blue", value: "bg-blue-500", hex: "#3b82f6" },
  { name: "Green", value: "bg-green-500", hex: "#10b981" },
  { name: "Yellow", value: "bg-yellow-500", hex: "#eab308" },
  { name: "Red", value: "bg-red-500", hex: "#ef4444" },
];

const accessories = [
  { name: "Crown", icon: "👑" },
  { name: "Sunglasses", icon: "🕶️" },
  { name: "Bow", icon: "🎀" },
  { name: "Necklace", icon: "📿" },
];

export default function BarbieDesigner() {
  const [, setLocation] = useLocation();
  const [selectedHair, setSelectedHair] = useState(hairColors[0]);
  const [selectedOutfit, setSelectedOutfit] = useState(outfitColors[0]);
  const [selectedAccessory, setSelectedAccessory] = useState(accessories[0]);

  const handleSave = () => {
    alert("Your beautiful Barbie has been saved! 💄");
    setLocation("/");
  };

  const handleDownload = () => {
    // Create a simple SVG of the Barbie
    const svg = `
      <svg width="200" height="300" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect x="0" y="0" width="200" height="300" fill="#fdf2f8"/>
        
        <!-- Hair -->
        <ellipse cx="100" cy="80" rx="25" ry="30" fill="${selectedHair.hex}"/>
        
        <!-- Head -->
        <circle cx="100" cy="90" r="20" fill="#fdbcb4"/>
        
        <!-- Eyes -->
        <circle cx="95" cy="85" r="2" fill="black"/>
        <circle cx="105" cy="85" r="2" fill="black"/>
        <circle cx="95" cy="84" r="1" fill="white"/>
        <circle cx="105" cy="84" r="1" fill="white"/>
        
        <!-- Mouth -->
        <ellipse cx="100" cy="95" rx="3" ry="2" fill="#ff69b4"/>
        
        <!-- Body -->
        <rect x="90" y="110" width="20" height="60" fill="${selectedOutfit.hex}" rx="10"/>
        
        <!-- Arms -->
        <rect x="80" y="120" width="8" height="40" fill="#fdbcb4" rx="4"/>
        <rect x="112" y="120" width="8" height="40" fill="#fdbcb4" rx="4"/>
        
        <!-- Legs -->
        <rect x="92" y="170" width="6" height="50" fill="#fdbcb4" rx="3"/>
        <rect x="102" y="170" width="6" height="50" fill="#fdbcb4" rx="3"/>
        
        <!-- Shoes -->
        <ellipse cx="95" cy="225" rx="6" ry="4" fill="black"/>
        <ellipse cx="105" cy="225" rx="6" ry="4" fill="black"/>
        
        <!-- Accessory -->
        <text x="100" y="70" text-anchor="middle" font-size="16">${selectedAccessory.icon}</text>
        
        <!-- Text -->
        <text x="100" y="260" text-anchor="middle" font-family="Arial" font-size="12" fill="black">
          My ${selectedHair.name} Hair Barbie
        </text>
        
        <!-- Sparkles -->
        <text x="40" y="100" font-size="12">✨</text>
        <text x="160" y="120" font-size="12">💫</text>
        <text x="50" y="200" font-size="12">⭐</text>
      </svg>
    `;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-${selectedHair.name.toLowerCase()}-barbie.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-pink-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-inter font-bold text-gray-800">Barbie Designer</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Barbie Preview */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-inter font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-600" />
              Your Barbie Preview
            </h2>
            
            <div className="relative bg-gradient-to-b from-pink-100 to-purple-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              {/* Barbie Figure */}
              <div className="relative">
                {/* Head */}
                <div className="w-16 h-20 bg-pink-200 rounded-full relative mx-auto mb-2">
                  {/* Hair */}
                  <div className={`${selectedHair.value} w-18 h-16 rounded-full absolute -top-2 -left-1 -right-1`}></div>
                  {/* Face */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-2">
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-black rounded-full"></div>
                    </div>
                    <div className="w-2 h-1 bg-red-400 rounded-full mt-2 mx-auto"></div>
                  </div>
                  {/* Accessory */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xl">
                    {selectedAccessory.icon}
                  </div>
                </div>
                
                {/* Body */}
                <div className={`${selectedOutfit.value} w-12 h-20 rounded-t-full mx-auto relative`}>
                  {/* Arms */}
                  <div className="absolute -left-2 top-2 w-4 h-12 bg-pink-200 rounded-full"></div>
                  <div className="absolute -right-2 top-2 w-4 h-12 bg-pink-200 rounded-full"></div>
                </div>
                
                {/* Legs */}
                <div className="flex justify-center space-x-2 mt-1">
                  <div className="w-3 h-16 bg-pink-200 rounded-full"></div>
                  <div className="w-3 h-16 bg-pink-200 rounded-full"></div>
                </div>
                
                {/* Shoes */}
                <div className="flex justify-center space-x-2 mt-1">
                  <div className="w-4 h-2 bg-black rounded-full"></div>
                  <div className="w-4 h-2 bg-black rounded-full"></div>
                </div>
              </div>
              
              {/* Sparkles */}
              <div className="absolute top-4 left-4 text-yellow-400 text-2xl">✨</div>
              <div className="absolute top-8 right-6 text-pink-400 text-xl">💫</div>
              <div className="absolute bottom-8 left-6 text-purple-400 text-xl">⭐</div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-inter font-semibold text-gray-700">
                {selectedHair.name} Hair • {selectedOutfit.name} Outfit
              </p>
              <p className="text-sm text-gray-600">with {selectedAccessory.name}</p>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            {/* Hair Color Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-600" />
                Choose Hair Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {hairColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedHair(color)}
                    className={`${color.value} w-16 h-16 rounded-full shadow-md hover:shadow-lg transition-shadow ${
                      selectedHair.name === color.name ? 'ring-4 ring-pink-400' : ''
                    }`}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Outfit Color Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600" />
                Choose Outfit Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {outfitColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedOutfit(color)}
                    className={`${color.value} w-16 h-16 rounded-full shadow-md hover:shadow-lg transition-shadow ${
                      selectedOutfit.name === color.name ? 'ring-4 ring-purple-400' : ''
                    }`}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                Add Accessories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {accessories.map((accessory) => (
                  <button
                    key={accessory.name}
                    onClick={() => setSelectedAccessory(accessory)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedAccessory.name === accessory.name
                        ? 'border-pink-500 bg-pink-50'
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
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-inter font-bold py-4 rounded-2xl text-lg"
              >
                Save My Beautiful Barbie! 💄
              </Button>
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="px-6 py-4 rounded-2xl border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-inter font-bold"
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