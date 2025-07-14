import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  currentLevel: integer("current_level").notNull().default(1),
  totalStars: integer("total_stars").notNull().default(0),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'addition', 'subtraction', 'counting', 'number_recognition', 'shapes', 'multiplication', 'division', 'fractions', 'word_problems', 'time_telling'
  difficulty: integer("difficulty").notNull().default(1), // 1-4 for grades K-4
  problem: jsonb("problem").notNull(), // { firstNumber: 5, secondNumber: 3, operation: '+', correctAnswer: 8, visualType: 'apples' }
  options: jsonb("options").notNull(), // [6, 7, 8, 9]
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  exerciseType: text("exercise_type").notNull(),
  completed: integer("completed").notNull().default(0),
  total: integer("total").notNull().default(5),
  stars: integer("stars").notNull().default(0),
  lastCompletedAt: text("last_completed_at"),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  exerciseType: text("exercise_type").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent").notNull(), // in seconds
  completedAt: text("completed_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertExerciseSchema = createInsertSchema(exercises).omit({ id: true });
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({ id: true });
export const insertSessionSchema = createInsertSchema(sessions).omit({ id: true });

export type User = typeof users.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type Session = typeof sessions.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export type ExerciseType = 'addition' | 'subtraction' | 'counting' | 'number_recognition' | 'shapes' | 'multiplication' | 'division' | 'fractions' | 'word_problems' | 'time_telling';
