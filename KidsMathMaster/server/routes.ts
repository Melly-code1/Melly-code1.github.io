import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, type ExerciseType } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (for demo purposes, always return user 1)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get user progress
  app.get("/api/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(1);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Get exercises by type
  app.get("/api/exercises/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const difficulty = req.query.difficulty ? parseInt(req.query.difficulty as string) : undefined;
      
      const exercises = await storage.getExercisesByType(type as ExerciseType, difficulty);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exercises" });
    }
  });

  // Generate random exercise
  app.get("/api/exercises/:type/random", async (req, res) => {
    try {
      const { type } = req.params;
      const difficulty = req.query.difficulty ? parseInt(req.query.difficulty as string) : 1;
      
      // Generate random exercise based on type
      let exercise;
      const id = Math.floor(Math.random() * 10000);
      
      switch (type) {
        case "addition":
          const maxAdd = difficulty === 1 ? 10 : difficulty === 2 ? 20 : difficulty === 3 ? 50 : 100;
          const num1 = Math.floor(Math.random() * maxAdd) + 1;
          const num2 = Math.floor(Math.random() * maxAdd) + 1;
          const sum = num1 + num2;
          exercise = {
            id,
            type: "addition",
            difficulty,
            problem: { firstNumber: num1, secondNumber: num2, operation: "+", correctAnswer: sum, visualType: "apples" },
            options: [sum, sum + 1, sum - 1, sum + 2].sort(() => Math.random() - 0.5),
          };
          break;
          
        case "subtraction":
          const maxSub = difficulty === 1 ? 15 : difficulty === 2 ? 30 : difficulty === 3 ? 75 : 150;
          const minuend = Math.floor(Math.random() * maxSub) + 5;
          const subtrahend = Math.floor(Math.random() * minuend) + 1;
          const difference = minuend - subtrahend;
          exercise = {
            id,
            type: "subtraction",
            difficulty,
            problem: { firstNumber: minuend, secondNumber: subtrahend, operation: "-", correctAnswer: difference, visualType: "stars" },
            options: [difference, difference + 1, difference - 1, difference + 2].filter(n => n >= 0).sort(() => Math.random() - 0.5),
          };
          break;
          
        case "counting":
          const maxCount = difficulty === 1 ? 15 : difficulty === 2 ? 25 : difficulty === 3 ? 50 : 100;
          const count = Math.floor(Math.random() * maxCount) + 1;
          exercise = {
            id,
            type: "counting",
            difficulty,
            problem: { objects: count, visualType: "circles", correctAnswer: count },
            options: [count, count + 1, count - 1, count + 2].filter(n => n > 0).sort(() => Math.random() - 0.5),
          };
          break;
          
        case "number_recognition":
          const maxNum = difficulty === 1 ? 20 : difficulty === 2 ? 50 : difficulty === 3 ? 100 : 1000;
          const number = Math.floor(Math.random() * maxNum) + 1;
          exercise = {
            id,
            type: "number_recognition",
            difficulty,
            problem: { number, correctAnswer: number },
            options: [number, number + 1, number - 1, number + 2].filter(n => n > 0).sort(() => Math.random() - 0.5),
          };
          break;
          
        case "shapes":
          const shapes = difficulty <= 2 ? ["circle", "square", "triangle", "rectangle"] : 
                        ["circle", "square", "triangle", "rectangle", "pentagon", "hexagon", "oval", "diamond"];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const otherShapes = shapes.filter(s => s !== shape);
          exercise = {
            id,
            type: "shapes",
            difficulty,
            problem: { shape, correctAnswer: shape },
            options: [shape, ...otherShapes.slice(0, 3)].sort(() => Math.random() - 0.5),
          };
          break;
          
        case "multiplication":
          const maxMult = difficulty === 3 ? 10 : 12;
          const factor1 = Math.floor(Math.random() * maxMult) + 1;
          const factor2 = Math.floor(Math.random() * maxMult) + 1;
          const product = factor1 * factor2;
          exercise = {
            id,
            type: "multiplication",
            difficulty,
            problem: { firstNumber: factor1, secondNumber: factor2, operation: "×", correctAnswer: product, visualType: "groups" },
            options: [product, product + factor1, product - factor1, product + factor2].sort(() => Math.random() - 0.5),
          };
          break;
          
        case "division":
          const divisor = Math.floor(Math.random() * 10) + 2;
          const quotient = Math.floor(Math.random() * 10) + 1;
          const dividend = divisor * quotient;
          exercise = {
            id,
            type: "division",
            difficulty,
            problem: { firstNumber: dividend, secondNumber: divisor, operation: "÷", correctAnswer: quotient, visualType: "groups" },
            options: [quotient, quotient + 1, quotient - 1, quotient + 2].filter(n => n > 0).sort(() => Math.random() - 0.5),
          };
          break;
          
        case "fractions":
          const denominators = [2, 3, 4, 5, 6, 8, 10];
          const denominator = denominators[Math.floor(Math.random() * denominators.length)];
          const numerator = Math.floor(Math.random() * denominator) + 1;
          const fractionAnswer = `${numerator}/${denominator}`;
          const otherDenoms = denominators.filter(d => d !== denominator);
          exercise = {
            id,
            type: "fractions",
            difficulty,
            problem: { numerator, denominator, correctAnswer: fractionAnswer, visualType: "pie" },
            options: [
              fractionAnswer,
              `${numerator}/${otherDenoms[0]}`,
              `${numerator + 1}/${denominator}`,
              `${numerator}/${otherDenoms[1] || denominator + 1}`
            ].sort(() => Math.random() - 0.5),
          };
          break;
          
        case "word_problems":
          const problems = [
            {
              story: "Emma has 15 marbles. She gives 4 to her brother and finds 7 more. How many marbles does she have now?",
              correctAnswer: 18,
              operation: "mixed"
            },
            {
              story: "There are 24 students in a class. If they form teams of 6, how many teams will there be?",
              correctAnswer: 4,
              operation: "division"
            },
            {
              story: "A bag contains 8 red balls and 12 blue balls. How many balls are in the bag in total?",
              correctAnswer: 20,
              operation: "addition"
            }
          ];
          const wordProblem = problems[Math.floor(Math.random() * problems.length)];
          exercise = {
            id,
            type: "word_problems",
            difficulty,
            problem: wordProblem,
            options: [
              wordProblem.correctAnswer,
              wordProblem.correctAnswer + 1,
              wordProblem.correctAnswer - 1,
              wordProblem.correctAnswer + 2
            ].sort(() => Math.random() - 0.5),
          };
          break;
          
        case "time_telling":
          const hours = Math.floor(Math.random() * 12) + 1;
          const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
          const timeAnswer = `${hours}:${minutes.toString().padStart(2, '0')}`;
          exercise = {
            id,
            type: "time_telling",
            difficulty,
            problem: { hours, minutes, correctAnswer: timeAnswer, visualType: "analog" },
            options: [
              timeAnswer,
              `${hours}:${((minutes + 15) % 60).toString().padStart(2, '0')}`,
              `${hours % 12 + 1}:${minutes.toString().padStart(2, '0')}`,
              `${hours}:${((minutes + 30) % 60).toString().padStart(2, '0')}`
            ].sort(() => Math.random() - 0.5),
          };
          break;
          
        default:
          return res.status(400).json({ message: "Invalid exercise type" });
      }
      
      res.json(exercise);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate exercise" });
    }
  });

  // Submit exercise answer
  app.post("/api/exercises/submit", async (req, res) => {
    try {
      const { exerciseId, exerciseType, isCorrect, timeSpent } = req.body;
      
      // Create session record
      const session = await storage.createSession({
        userId: 1,
        exerciseType,
        isCorrect,
        timeSpent,
        completedAt: new Date().toISOString(),
      });
      
      // Update user progress
      const progress = await storage.getUserProgressByType(1, exerciseType);
      if (progress && isCorrect) {
        const newCompleted = Math.min(progress.completed + 1, progress.total);
        const newStars = Math.min(progress.stars + 1, 5);
        
        await storage.updateUserProgress(progress.id, {
          completed: newCompleted,
          stars: newStars,
          lastCompletedAt: new Date().toISOString(),
        });
        
        // Update user's total stars
        const user = await storage.getUser(1);
        if (user) {
          await storage.updateUser(1, {
            totalStars: user.totalStars + (isCorrect ? 1 : 0),
          });
        }
      }
      
      res.json({ success: true, session });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit exercise" });
    }
  });

  // Get user sessions for dashboard
  app.get("/api/sessions", async (req, res) => {
    try {
      const sessions = await storage.getUserSessions(1, 50);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
