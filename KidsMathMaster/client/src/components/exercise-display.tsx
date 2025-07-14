import { useState } from "react";
import { type Exercise } from "@shared/schema";
import { Button } from "@/components/ui/button";
import VisualCounter from "@/components/visual-counter";
import { speakText } from "@/lib/audio";
import { Volume2 } from "lucide-react";

interface ExerciseDisplayProps {
  exercise: Exercise;
  onAnswerSelect: (answer: any) => void;
  isLoading: boolean;
}

export default function ExerciseDisplay({ exercise, onAnswerSelect, isLoading }: ExerciseDisplayProps) {
  const [highlightedWord, setHighlightedWord] = useState<number>(-1);
  const [isReading, setIsReading] = useState(false);

  const handleReadAloud = () => {
    if (isReading) return;
    
    setIsReading(true);
    let textToRead = "";
    
    switch (exercise.type) {
      case "addition":
        textToRead = `${exercise.problem.firstNumber} plus ${exercise.problem.secondNumber} equals what?`;
        break;
      case "subtraction":
        textToRead = `${exercise.problem.firstNumber} minus ${exercise.problem.secondNumber} equals what?`;
        break;
      case "multiplication":
        textToRead = `${exercise.problem.firstNumber} times ${exercise.problem.secondNumber} equals what?`;
        break;
      case "division":
        textToRead = `${exercise.problem.firstNumber} divided by ${exercise.problem.secondNumber} equals what?`;
        break;
      case "counting":
        textToRead = `Count the ${exercise.problem.visualType}. How many are there?`;
        break;
      case "number_recognition":
        textToRead = `What number is this? ${exercise.problem.number || exercise.problem.targetNumber}`;
        break;
      case "shapes":
        textToRead = `What shape is this?`;
        break;
      case "fractions":
        textToRead = `What fraction is shown? ${exercise.problem.numerator} out of ${exercise.problem.denominator}`;
        break;
      case "word_problems":
        textToRead = exercise.problem.story || exercise.problem.question || "Solve this word problem";
        break;
      case "time_telling":
        textToRead = `What time is shown on the clock?`;
        break;
      default:
        textToRead = "What is the answer?";
    }
    
    // Ensure we have valid text to read
    if (textToRead && textToRead.length > 0) {
      speakText(textToRead, (word, index) => {
        setHighlightedWord(index);
      });
      
      // Reset highlighting after speech (adjusted for slower speech)
      setTimeout(() => {
        setIsReading(false);
        setHighlightedWord(-1);
      }, textToRead.length * 150); // Longer duration for slower speech
    } else {
      // If no text to read, reset immediately
      setIsReading(false);
      setHighlightedWord(-1);
    }
  };

  const renderProblem = () => {
    switch (exercise.type) {
      case "addition":
      case "subtraction":
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-coral to-turquoise rounded-2xl p-8 mb-6">
              <div className="text-8xl font-inter font-bold text-white mb-4">
                <span className={`text-yellow-300 ${highlightedWord === 0 ? 'bg-yellow-400 bg-opacity-30 rounded-lg px-2' : ''}`}>
                  {exercise.problem.firstNumber}
                </span>
                <span className={`mx-6 text-orange-300 ${highlightedWord === 1 ? 'bg-orange-400 bg-opacity-30 rounded-lg px-2' : ''}`}>
                  {exercise.problem.operation}
                </span>
                <span className={`text-cyan-300 ${highlightedWord === 2 ? 'bg-cyan-400 bg-opacity-30 rounded-lg px-2' : ''}`}>
                  {exercise.problem.secondNumber}
                </span>
                <span className={`mx-6 text-green-300 ${highlightedWord === 3 ? 'bg-green-400 bg-opacity-30 rounded-lg px-2' : ''}`}>
                  =
                </span>
                <span className={`text-pink-300 ${highlightedWord === 4 ? 'bg-pink-400 bg-opacity-30 rounded-lg px-2' : ''}`}>
                  ?
                </span>
              </div>
            </div>

            {/* Visual Objects */}
            <div className="flex justify-center items-center space-x-8 mb-6">
              <VisualCounter
                count={exercise.problem.firstNumber}
                type={exercise.problem.visualType}
                color="coral"
              />
              
              <div className="text-6xl text-red-400 font-inter font-bold">
                {exercise.problem.operation}
              </div>
              
              <VisualCounter
                count={exercise.problem.secondNumber}
                type={exercise.problem.visualType}
                color="turquoise"
              />
            </div>
          </div>
        );

      case "counting":
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-mint to-skyblue rounded-2xl p-8 mb-6">
              <div className="text-4xl font-inter font-bold text-white mb-4">
                Count the {exercise.problem.visualType}
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <VisualCounter
                count={exercise.problem.objects}
                type={exercise.problem.visualType}
                color="mint"
              />
            </div>
          </div>
        );

      case "number_recognition":
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-plum to-coral rounded-2xl p-8 mb-6">
              <div className="text-4xl font-inter font-bold text-black mb-4">
                What number is this?
              </div>
              <div className="text-8xl font-inter font-bold text-green-300">
                {exercise.problem.number}
              </div>
            </div>
          </div>
        );

      case "shapes":
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-lightyellow to-mint rounded-2xl p-8 mb-6">
              <div className="text-4xl font-inter font-bold text-orange-600 mb-4">
                What shape is this?
              </div>
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center">
                  {exercise.problem.shape === 'circle' && <div className="w-16 h-16 bg-white rounded-full" />}
                  {exercise.problem.shape === 'square' && <div className="w-16 h-16 bg-white" />}
                  {exercise.problem.shape === 'triangle' && <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-white" />}
                  {exercise.problem.shape === 'rectangle' && <div className="w-20 h-12 bg-white" />}
                  {exercise.problem.shape === 'pentagon' && <div className="w-16 h-16 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />}
                  {exercise.problem.shape === 'hexagon' && <div className="w-16 h-16 bg-white" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />}
                  {exercise.problem.shape === 'oval' && <div className="w-20 h-12 bg-white rounded-full" />}
                  {exercise.problem.shape === 'diamond' && <div className="w-16 h-16 bg-white transform rotate-45" />}
                </div>
              </div>
            </div>
          </div>
        );

      case "multiplication":
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-8 mb-6">
              <div className="text-8xl font-inter font-bold text-white mb-4">
                <span className="text-green-300">{exercise.problem.firstNumber}</span>
                <span className="mx-6 text-red-300">×</span>
                <span className="text-blue-300">{exercise.problem.secondNumber}</span>
                <span className="mx-6 text-orange-300">=</span>
                <span className="text-yellow-300">?</span>
              </div>
            </div>

            <div className="flex justify-center items-center mb-6">
              <div className="text-center">
                <div className="text-lg font-inter font-semibold text-purple-700 mb-2">
                  <span className="text-green-600">{exercise.problem.firstNumber}</span> groups of <span className="text-blue-600">{exercise.problem.secondNumber}</span>
                </div>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${exercise.problem.firstNumber}, 1fr)` }}>
                  {Array.from({ length: exercise.problem.firstNumber }, (_, groupIndex) => (
                    <div key={groupIndex} className="bg-purple-100 rounded-lg p-2">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {Array.from({ length: exercise.problem.secondNumber }, (_, itemIndex) => (
                          <div key={itemIndex} className="w-3 h-3 bg-purple-400 rounded-full" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "division":
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-8 mb-6">
              <div className="text-8xl font-inter font-bold text-white mb-4">
                <span className="text-orange-300">{exercise.problem.firstNumber}</span>
                <span className="mx-6 text-cyan-300">÷</span>
                <span className="text-purple-300">{exercise.problem.secondNumber}</span>
                <span className="mx-6 text-green-300">=</span>
                <span className="text-yellow-300">?</span>
              </div>
            </div>

            <div className="flex justify-center items-center mb-6">
              <div className="text-center">
                <div className="text-lg font-inter font-semibold text-blue-700 mb-2">
                  Divide <span className="text-orange-600">{exercise.problem.firstNumber}</span> into <span className="text-purple-600">{exercise.problem.secondNumber}</span> equal groups
                </div>
                <div className="flex justify-center gap-2">
                  {Array.from({ length: exercise.problem.firstNumber }, (_, i) => (
                    <div key={i} className="w-4 h-4 bg-blue-400 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "fractions":
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl p-8 mb-6">
              <div className="text-4xl font-inter font-bold text-white mb-4">
                What fraction is shown?
              </div>
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <div className="w-full h-full bg-white rounded-full border-4 border-orange-300">
                    <div 
                      className="bg-orange-300 rounded-full"
                      style={{
                        width: '100%',
                        height: '100%',
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + (exercise.problem.numerator / exercise.problem.denominator) * 50}% 0%, 50% 50%)`,
                        transform: `rotate(${(exercise.problem.numerator / exercise.problem.denominator) * 360}deg)`,
                        transformOrigin: 'center'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-inter font-bold text-gray-800">
                      <span className="text-red-600">{exercise.problem.numerator}</span><span className="text-blue-600">/</span><span className="text-green-600">{exercise.problem.denominator}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "word_problems":
        const problemText = exercise.problem.story || exercise.problem.question || "Solve this word problem";
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl p-8 mb-6">
              <div className="text-2xl font-inter font-bold text-white mb-4">
                Story Problem
              </div>
              <div className="text-lg text-white leading-relaxed max-w-2xl mx-auto">
                {problemText.split(' ').map((word, index) => (
                  <span 
                    key={index}
                    className={`${highlightedWord === index ? 'bg-yellow-400 bg-opacity-50 rounded px-1' : ''}`}
                  >
                    {word}{index < problemText.split(' ').length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "time_telling":
        return (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl p-8 mb-6">
              <div className="text-4xl font-inter font-bold text-white mb-4">
                What time is shown?
              </div>
              <div className="flex justify-center">
                <div className="relative w-32 h-32 bg-white rounded-full border-4 border-teal-300">
                  {/* Clock face */}
                  <div className="absolute inset-2 rounded-full border-2 border-gray-300">
                    {/* Hour marks */}
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-4 bg-gray-600"
                        style={{
                          top: '10%',
                          left: '50%',
                          transformOrigin: '50% 250%',
                          transform: `translateX(-50%) rotate(${i * 30}deg)`,
                        }}
                      />
                    ))}
                    {/* Hour hand */}
                    <div
                      className="absolute w-1 h-8 bg-gray-800 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '50% 0%',
                        transform: `translate(-50%, -100%) rotate(${(exercise.problem.hours % 12) * 30 + (exercise.problem.minutes / 60) * 30}deg)`,
                      }}
                    />
                    {/* Minute hand */}
                    <div
                      className="absolute w-0.5 h-12 bg-gray-600 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '50% 0%',
                        transform: `translate(-50%, -100%) rotate(${exercise.problem.minutes * 6}deg)`,
                      }}
                    />
                    {/* Center dot */}
                    <div className="absolute w-2 h-2 bg-gray-800 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getButtonColors = () => {
    const colors = [
      'bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700', 
      'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700', 
      'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700', 
      'bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700'
    ];
    return colors;
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-inter font-semibold text-gray-800">Current Problem</h3>
      </div>

      {renderProblem()}

      {/* Read to Me Button */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={handleReadAloud}
          disabled={isReading}
          className="h-12 px-6 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl flex items-center gap-2"
        >
          <Volume2 className="w-5 h-5" />
          {isReading ? 'Reading...' : 'Read to Me'}
        </Button>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {exercise.options.map((option, index) => {
          const colors = getButtonColors();
          const buttonColor = colors[index % colors.length];
          
          return (
            <Button
              key={index}
              className={`${buttonColor} text-white text-3xl font-inter font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 h-20`}
              onClick={() => {
                speakText(option.toString());
                onAnswerSelect(option);
              }}
              disabled={isLoading}
            >
              {option}
            </Button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Keep going!</span>
          <span className="text-sm text-gray-600">You're doing great!</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-coral to-turquoise h-3 rounded-full transition-all duration-300" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  );
}
