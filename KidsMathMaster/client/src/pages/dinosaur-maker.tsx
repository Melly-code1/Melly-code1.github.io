import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Zap, Download } from "lucide-react";

const dinosaurTypes = [
  { name: "T-Rex", shape: "trex" },
  { name: "Triceratops", shape: "triceratops" },
  { name: "Stegosaurus", shape: "stegosaurus" },
  { name: "Brontosaurus", shape: "brontosaurus" },
];

const dinosaurColors = [
  { name: "Green", value: "bg-green-500", hex: "#10b981" },
  { name: "Blue", value: "bg-blue-500", hex: "#3b82f6" },
  { name: "Red", value: "bg-red-500", hex: "#ef4444" },
  { name: "Purple", value: "bg-purple-500", hex: "#a855f7" },
  { name: "Orange", value: "bg-orange-500", hex: "#f97316" },
  { name: "Yellow", value: "bg-yellow-500", hex: "#eab308" },
];

const patterns = [
  { name: "Solid", pattern: "solid" },
  { name: "Stripes", pattern: "stripes" },
  { name: "Spots", pattern: "spots" },
  { name: "Gradient", pattern: "gradient" },
];

export default function DinosaurMaker() {
  const [, setLocation] = useLocation();
  const [selectedType, setSelectedType] = useState(dinosaurTypes[0]);
  const [selectedColor, setSelectedColor] = useState(dinosaurColors[0]);
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);

  const handleSave = () => {
    alert("Your awesome dinosaur has been saved! 🦕");
    setLocation("/");
  };

  const handleDownload = () => {
    // Create a simple SVG of the dinosaur
    const svg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4">
            <rect width="4" height="4" fill="${selectedColor.hex}"/>
            <rect width="2" height="4" fill="rgba(0,0,0,0.2)"/>
          </pattern>
          <pattern id="spots" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill="${selectedColor.hex}"/>
            <circle cx="10" cy="10" r="3" fill="rgba(0,0,0,0.3)"/>
          </pattern>
        </defs>
        
        <!-- Dinosaur body -->
        <ellipse cx="100" cy="120" rx="50" ry="30" fill="${selectedPattern.pattern === 'solid' ? selectedColor.hex : `url(#${selectedPattern.pattern})`}"/>
        
        <!-- Dinosaur head -->
        <ellipse cx="60" cy="100" rx="25" ry="20" fill="${selectedPattern.pattern === 'solid' ? selectedColor.hex : `url(#${selectedPattern.pattern})`}"/>
        
        <!-- Dinosaur tail -->
        <ellipse cx="140" cy="130" rx="30" ry="15" fill="${selectedPattern.pattern === 'solid' ? selectedColor.hex : `url(#${selectedPattern.pattern})`}"/>
        
        <!-- Dinosaur legs -->
        <rect x="80" y="140" width="8" height="20" fill="${selectedColor.hex}"/>
        <rect x="100" y="140" width="8" height="20" fill="${selectedColor.hex}"/>
        <rect x="120" y="140" width="8" height="20" fill="${selectedColor.hex}"/>
        
        <!-- Eyes -->
        <circle cx="55" cy="95" r="3" fill="black"/>
        <circle cx="56" cy="94" r="1" fill="white"/>
        
        <!-- Text -->
        <text x="100" y="180" text-anchor="middle" font-family="Arial" font-size="12" fill="black">
          My ${selectedType.name}
        </text>
      </svg>
    `;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-${selectedType.name.toLowerCase()}-dinosaur.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-green-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-inter font-bold text-gray-800">Dinosaur Maker</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dinosaur Preview */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-inter font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-green-600" />
              Your Dinosaur Preview
            </h2>
            
            <div className="relative bg-gradient-to-b from-green-100 to-blue-100 rounded-2xl p-8 h-64 flex items-center justify-center">
              {/* Dinosaur Body */}
              <div className="relative">
                {/* Body */}
                <div className={`${selectedColor.value} w-40 h-20 rounded-full relative transform hover:scale-105 transition-transform`}>
                  {/* Pattern overlay */}
                  {selectedPattern.pattern === 'stripes' && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 10px)'
                    }}></div>
                  )}
                  {selectedPattern.pattern === 'spots' && (
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute top-2 left-4 w-3 h-3 bg-black bg-opacity-30 rounded-full"></div>
                      <div className="absolute top-6 left-8 w-2 h-2 bg-black bg-opacity-30 rounded-full"></div>
                      <div className="absolute top-4 right-6 w-3 h-3 bg-black bg-opacity-30 rounded-full"></div>
                      <div className="absolute bottom-4 left-6 w-2 h-2 bg-black bg-opacity-30 rounded-full"></div>
                    </div>
                  )}
                  
                  {/* Head */}
                  <div className={`${selectedColor.value} w-16 h-12 rounded-full absolute -left-8 -top-2`}>
                    {/* Eyes */}
                    <div className="absolute top-3 left-3 w-2 h-2 bg-black rounded-full"></div>
                    <div className="absolute top-3 left-4 w-1 h-1 bg-white rounded-full"></div>
                    {/* Mouth */}
                    <div className="absolute bottom-2 left-2 w-4 h-1 bg-black rounded-full"></div>
                  </div>
                  
                  {/* Tail */}
                  <div className={`${selectedColor.value} w-20 h-8 rounded-full absolute -right-12 top-6`}></div>
                  
                  {/* Legs */}
                  <div className={`${selectedColor.value} w-4 h-8 rounded-full absolute bottom-8 left-6`}></div>
                  <div className={`${selectedColor.value} w-4 h-8 rounded-full absolute bottom-8 left-12`}></div>
                  <div className={`${selectedColor.value} w-4 h-8 rounded-full absolute bottom-8 right-12`}></div>
                  <div className={`${selectedColor.value} w-4 h-8 rounded-full absolute bottom-8 right-6`}></div>
                </div>
              </div>
              
              {/* Environment */}
              <div className="absolute bottom-4 left-4 text-green-600 text-xl">🌿</div>
              <div className="absolute bottom-6 right-8 text-green-600 text-lg">🌱</div>
              <div className="absolute top-4 right-4 text-yellow-500 text-2xl">☀️</div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg font-inter font-semibold text-gray-700">
                {selectedColor.name} {selectedType.name}
              </p>
              <p className="text-sm text-gray-600">with {selectedPattern.name} pattern</p>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            {/* Dinosaur Type */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Choose Dinosaur Type
              </h3>
              <div className="space-y-3">
                {dinosaurTypes.map((type) => (
                  <button
                    key={type.name}
                    onClick={() => setSelectedType(type)}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedType.name === type.name
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-inter font-semibold text-gray-700">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" />
                Choose Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {dinosaurColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`${color.value} w-16 h-16 rounded-full shadow-md hover:shadow-lg transition-shadow ${
                      selectedColor.name === color.name ? 'ring-4 ring-green-400' : ''
                    }`}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-inter font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Choose Pattern
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.name}
                    onClick={() => setSelectedPattern(pattern)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPattern.name === pattern.name
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-inter font-semibold text-gray-700 text-sm">{pattern.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-inter font-bold py-4 rounded-2xl text-lg"
              >
                Save My Dinosaur! 🦕
              </Button>
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="px-6 py-4 rounded-2xl border-2 border-green-500 text-green-600 hover:bg-green-50 font-inter font-bold"
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