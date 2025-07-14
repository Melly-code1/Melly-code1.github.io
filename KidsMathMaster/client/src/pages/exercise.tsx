import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Exercise, type ExerciseType } from "@shared/schema";
import { ArrowLeft, Volume2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { playSound, speakText } from "@/lib/audio";
import ExerciseDisplay from "@/components/exercise-display";
import SuccessModal from "@/components/success-modal";
import { Link } from "wouter";

export default function Exercise() {
  const [match, params] = useRoute("/exercise/:type");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  
  const exerciseType = params?.type as ExerciseType;

  const { data: exercise, refetch } = useQuery<Exercise>({
    queryKey: ["/api/exercises", exerciseType, "random"],
    enabled: !!exerciseType,
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async ({ exerciseId, isCorrect, timeSpent }: { exerciseId: number; isCorrect: boolean; timeSpent: number }) => {
      const response = await apiRequest("POST", "/api/exercises/submit", {
        exerciseId,
        exerciseType,
        isCorrect,
        timeSpent,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
  });

  useEffect(() => {
    if (exercise) {
      setCurrentExercise(exercise);
      setStartTime(Date.now());
    }
  }, [exercise]);

  const handleAnswerSelect = async (selectedAnswer: any) => {
    if (!currentExercise) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const isCorrect = selectedAnswer === currentExercise.problem.correctAnswer;

    // Submit answer
    await submitAnswerMutation.mutateAsync({
      exerciseId: currentExercise.id,
      isCorrect,
      timeSpent,
    });

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setShowSuccessModal(true);
      playSound("success");
      // Speak encouragement for correct answers
      setTimeout(() => {
        speakText("Great job! That's correct!");
      }, 500);
    } else {
      playSound("error");
      // Speak encouragement for incorrect answers
      setTimeout(() => {
        speakText("Try again! You can do it!");
      }, 500);
      toast({
        title: "Try again!",
        description: "That's not quite right. Keep trying!",
        variant: "destructive",
      });
    }

    setExerciseCount(prev => prev + 1);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    refetch();
  };

  const handlePlayAudio = () => {
    if (currentExercise) {
      playSound("instruction");
    }
  };

  if (!exerciseType) {
    return <div>Invalid exercise type</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg rounded-b-3xl mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-fredoka text-gray-800 capitalize">
                {exerciseType.replace("_", " ")}
              </h1>
              <p className="text-sm text-gray-600">Problem {exerciseCount + 1}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Correct: {correctAnswers}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handlePlayAudio}>
              <Volume2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Exercise Content */}
      <div className="px-4 py-6">
        {currentExercise && (
          <ExerciseDisplay
            exercise={currentExercise}
            onAnswerSelect={handleAnswerSelect}
            isLoading={submitAnswerMutation.isPending}
          />
        )}
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onContinue={handleContinue}
        stars={3}
      />
    </div>
  );
}
