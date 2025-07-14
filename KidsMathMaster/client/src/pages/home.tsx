import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type User, type UserProgress } from "@shared/schema";
import Header from "@/components/header";
import ActivityCard from "@/components/activity-card";
import BottomNavigation from "@/components/bottom-navigation";
import { Calculator, Plus, Minus, Circle, Type, Shapes, Gift, X, Divide, Cake, FileText, Clock, Car, Zap, Building } from "lucide-react";

const activityConfig = [
  {
    id: "addition",
    title: "Addition",
    description: "Practice adding numbers",
    icon: Plus,
    color: "bg-coral",
    iconColor: "text-white",
    grade: "K-4",
  },
  {
    id: "subtraction",
    title: "Subtraction",
    description: "Take away numbers",
    icon: Minus,
    color: "bg-skyblue",
    iconColor: "text-white",
    grade: "K-4",
  },
  {
    id: "counting",
    title: "Counting",
    description: "Count objects and animals",
    icon: Circle,
    color: "bg-mint",
    iconColor: "text-white",
    grade: "K-2",
  },
  {
    id: "number_recognition",
    title: "Numbers",
    description: "Learn to recognize numbers",
    icon: Type,
    color: "bg-plum",
    iconColor: "text-white",
    grade: "K-3",
  },
  {
    id: "shapes",
    title: "Shapes",
    description: "Identify basic shapes",
    icon: Shapes,
    color: "bg-lightyellow",
    iconColor: "text-orange-600",
    grade: "K-3",
  },
  {
    id: "multiplication",
    title: "Multiplication",
    description: "Learn times tables",
    icon: X,
    color: "bg-gradient-to-br from-purple-400 to-pink-400",
    iconColor: "text-white",
    grade: "3-4",
  },
  {
    id: "division",
    title: "Division",
    description: "Practice dividing numbers",
    icon: Divide,
    color: "bg-gradient-to-br from-green-400 to-blue-400",
    iconColor: "text-white",
    grade: "3-4",
  },
  {
    id: "fractions",
    title: "Fractions",
    description: "Learn about parts of whole",
    icon: Cake,
    color: "bg-gradient-to-br from-orange-400 to-red-400",
    iconColor: "text-white",
    grade: "3-4",
  },
  {
    id: "word_problems",
    title: "Word Problems",
    description: "Solve story problems",
    icon: FileText,
    color: "bg-gradient-to-br from-indigo-400 to-purple-400",
    iconColor: "text-white",
    grade: "3-4",
  },
  {
    id: "time_telling",
    title: "Time",
    description: "Learn to tell time",
    icon: Clock,
    color: "bg-gradient-to-br from-teal-400 to-cyan-400",
    iconColor: "text-white",
    grade: "2-4",
  },
];

const bonusGames = [
  {
    id: "car_creator",
    title: "Car Creator",
    description: "Design your own racing car",
    icon: Car,
    color: "bg-gradient-to-br from-red-400 to-orange-500",
    iconColor: "text-white",
  },
  {
    id: "barbie_designer",
    title: "Barbie Designer",
    description: "Create your own Barbie character",
    icon: Shapes,
    color: "bg-gradient-to-br from-pink-400 to-purple-500",
    iconColor: "text-white",
  },
  {
    id: "dinosaur_maker",
    title: "Dinosaur Maker",
    description: "Build your own dinosaur friend",
    icon: Zap,
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    iconColor: "text-white",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: progress = [] } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  const getProgressForActivity = (activityId: string) => {
    return progress.find(p => p.exerciseType === activityId);
  };

  const totalCompletedActivities = progress.filter(p => p.completed >= 3).length;
  const bonusUnlocked = totalCompletedActivities >= 3;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen pb-20">
      <Header user={user} />
      
      {/* Welcome Section */}
      <section className="px-4 py-6">
        <div className="bg-gradient-to-r from-coral to-turquoise rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-3 rounded-2xl shadow-lg mb-2">
                <h2 className="text-3xl font-inter font-bold mb-2">
                  Hi there! 👋🏽
                </h2>
                <p className="text-lg">
                  Ready to practice math from Kindergarten to 4th Grade?
                </p>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-white">
                  Level {user?.currentLevel || 1}
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-white">
                  Math Fun
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Calculator className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Grid */}
      <section className="px-4 py-2">
        <h3 className="text-xl font-inter font-bold text-blue-600 mb-4">Choose Your Activity</h3>
        
        {/* Elementary Activities (K-2) */}
        <div className="mb-6">
          <h4 className="text-lg font-inter font-semibold text-green-600 mb-3">Elementary (K-2)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activityConfig.filter(activity => activity.grade.includes('K') || activity.grade.includes('2')).map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                progress={getProgressForActivity(activity.id)}
              />
            ))}
          </div>
        </div>

        {/* Advanced Activities (3-4) */}
        <div className="mb-6">
          <h4 className="text-lg font-inter font-semibold text-purple-600 mb-3">Advanced (3-4)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activityConfig.filter(activity => activity.grade.includes('3') || activity.grade.includes('4')).map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                progress={getProgressForActivity(activity.id)}
              />
            ))}
          </div>
        </div>
          
        {/* Bonus Games */}
        <div className="mb-6">
          <h4 className="text-lg font-inter font-semibold text-orange-600 mb-3">Bonus Games</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bonusGames.map((game) => (
              <div 
                key={game.id}
                onClick={() => bonusUnlocked && setLocation(`/${game.id.replace('_', '-')}`)}
                className={`${bonusUnlocked ? `${game.color} cursor-pointer` : 'bg-gray-300 cursor-not-allowed'} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform text-white`}
              >
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <game.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-inter font-bold mb-1">{game.title}</h4>
                <p className="text-sm opacity-90 mb-2">{game.description}</p>
                <div className="mb-3">
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    All Grades
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  {bonusUnlocked ? (
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      Unlocked! 🎉
                    </span>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <span className="text-xs opacity-75">Complete 3 activities to unlock</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
}
