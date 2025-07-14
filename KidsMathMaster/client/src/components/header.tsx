import { type User } from "@shared/schema";
import { Calculator, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeaderProps {
  user?: User;
}

export default function Header({ user }: HeaderProps) {
  const renderStars = (totalStars: number) => {
    const stars = [];
    const maxStars = 5;
    const filledStars = Math.min(totalStars, maxStars);
    
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
    }
    
    for (let i = filledStars; i < maxStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <header className="bg-white shadow-lg rounded-b-3xl mx-4 mt-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-coral rounded-full p-3">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-fredoka text-gray-800">MathFun</h1>
            <p className="text-sm text-gray-600">Learning Made Fun!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Progress Stars */}
          <div className="flex items-center space-x-1">
            {renderStars(user?.totalStars || 0)}
          </div>
          
          {/* Settings Button */}
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="bg-gray-100 hover:bg-gray-200">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
