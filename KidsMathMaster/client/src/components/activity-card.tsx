import { type UserProgress } from "@shared/schema";
import { Star } from "lucide-react";
import { Link } from "wouter";

interface ActivityCardProps {
  activity: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    iconColor: string;
    grade: string;
  };
  progress?: UserProgress;
}

export default function ActivityCard({ activity, progress }: ActivityCardProps) {
  const { icon: Icon } = activity;
  
  const renderStars = (stars: number) => {
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      starElements.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return starElements;
  };

  const getProgressColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 40) return 'bg-blue-100 text-blue-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <Link href={`/exercise/${activity.id}`}>
      <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform">
        <div className={`${activity.color} rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
          <Icon className={`w-8 h-8 ${activity.iconColor}`} />
        </div>
        <h4 className="text-lg font-fredoka text-gray-800 mb-1">{activity.title}</h4>
        <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
        <div className="mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            Grade {activity.grade}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(progress?.stars || 0)}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            progress 
              ? getProgressColor(progress.completed, progress.total)
              : 'bg-gray-100 text-gray-800'
          }`}>
            {progress ? `${progress.completed}/${progress.total} complete` : 'Not started'}
          </span>
        </div>
      </div>
    </Link>
  );
}
