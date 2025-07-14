import { Apple, Star, Circle, Heart, Flower } from "lucide-react";

interface VisualCounterProps {
  count: number;
  type: string;
  color: string;
}

export default function VisualCounter({ count, type, color }: VisualCounterProps) {
  const getIcon = () => {
    switch (type) {
      case "apples":
        return Apple;
      case "stars":
        return Star;
      case "circles":
        return Circle;
      case "hearts":
        return Heart;
      case "flowers":
        return Flower;
      default:
        return Circle;
    }
  };

  const getColorClass = () => {
    switch (color) {
      case "coral":
        return "bg-coral";
      case "turquoise":
        return "bg-turquoise";
      case "mint":
        return "bg-mint";
      case "skyblue":
        return "bg-skyblue";
      case "plum":
        return "bg-plum";
      default:
        return "bg-coral";
    }
  };

  const Icon = getIcon();
  const colorClass = getColorClass();

  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center gap-2 mb-2 max-w-xs">
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center animate-pulse`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        {count} {type}
      </p>
    </div>
  );
}
