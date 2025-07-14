import { useQuery } from "@tanstack/react-query";
import { type User, type UserProgress, type Session } from "@shared/schema";
import { X, Calendar, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ParentDashboard() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: progress = [] } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  const { data: sessions = [] } = useQuery<Session[]>({
    queryKey: ["/api/sessions"],
  });

  const totalTimeSpent = sessions.reduce((total, session) => total + session.timeSpent, 0);
  const totalProblems = sessions.length;
  const correctAnswers = sessions.filter(session => session.isCorrect).length;
  const accuracy = totalProblems > 0 ? Math.round((correctAnswers / totalProblems) * 100) : 0;

  const getWeeklyProgress = () => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const dayString = day.toISOString().split('T')[0];
      const hasSessions = sessions.some(session => 
        session.completedAt.startsWith(dayString)
      );
      weekDays.push({
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
        completed: hasSessions,
      });
    }
    
    return weekDays;
  };

  const weeklyProgress = getWeeklyProgress();
  const completedDays = weeklyProgress.filter(day => day.completed).length;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-lg p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-fredoka text-gray-800">Parent Dashboard</h2>
          <Link href="/">
            <Button variant="ghost" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>
      
      <div className="p-4 space-y-6">
        {/* Weekly Progress */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-fredoka text-gray-800 mb-4">Weekly Progress</h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  day.completed ? 'bg-coral' : 'bg-gray-200'
                }`}>
                  {day.completed && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">{completedDays} out of 7 days completed this week</p>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-fredoka text-gray-800 mb-4">Subject Progress</h3>
          <div className="space-y-4">
            {progress.map((subject) => {
              const percentage = Math.round((subject.completed / subject.total) * 100);
              const colors = {
                addition: 'bg-coral',
                subtraction: 'bg-skyblue',
                counting: 'bg-mint',
                number_recognition: 'bg-plum',
                shapes: 'bg-lightyellow',
                multiplication: 'bg-purple-400',
                division: 'bg-green-400',
                fractions: 'bg-orange-400',
                word_problems: 'bg-indigo-400',
                time_telling: 'bg-teal-400',
              };
              
              return (
                <div key={subject.exerciseType} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`${colors[subject.exerciseType as keyof typeof colors]} rounded-full w-10 h-10 flex items-center justify-center`}>
                      <span className="text-white text-sm">
                        {subject.exerciseType === 'addition' ? '+' : 
                         subject.exerciseType === 'subtraction' ? '-' : 
                         subject.exerciseType === 'counting' ? '•' : 
                         subject.exerciseType === 'number_recognition' ? '#' : 
                         subject.exerciseType === 'shapes' ? '◯' :
                         subject.exerciseType === 'multiplication' ? '×' :
                         subject.exerciseType === 'division' ? '÷' :
                         subject.exerciseType === 'fractions' ? '½' :
                         subject.exerciseType === 'word_problems' ? 'W' :
                         subject.exerciseType === 'time_telling' ? '🕐' : '◯'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-opensans font-semibold text-gray-800 capitalize">
                        {subject.exerciseType.replace('_', ' ')}
                      </h4>
                      <p className="text-xs text-gray-600">{subject.completed} of {subject.total} levels complete</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{percentage}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colors[subject.exerciseType as keyof typeof colors]} h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-8 h-8 text-coral" />
              <h3 className="text-lg font-fredoka text-gray-800">Time Spent</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-fredoka text-coral mb-2">
                {formatTime(totalTimeSpent)}
              </div>
              <p className="text-sm text-gray-600">Total learning time</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-mint" />
              <h3 className="text-lg font-fredoka text-gray-800">Performance</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-fredoka text-mint mb-2">{accuracy}%</div>
              <p className="text-sm text-gray-600">Accuracy rate</p>
              <div className="mt-2 text-sm text-gray-600">
                {correctAnswers} correct out of {totalProblems} problems
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Star className="w-8 h-8 text-yellow-400" />
            <h3 className="text-lg font-fredoka text-gray-800">Achievements</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-fredoka text-yellow-400">{user?.totalStars || 0}</div>
              <div className="text-xs text-gray-600">Total Stars</div>
            </div>
            <div>
              <div className="text-2xl font-fredoka text-skyblue">{totalProblems}</div>
              <div className="text-xs text-gray-600">Problems Solved</div>
            </div>
            <div>
              <div className="text-2xl font-fredoka text-plum">{user?.currentLevel || 1}</div>
              <div className="text-xs text-gray-600">Current Level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
