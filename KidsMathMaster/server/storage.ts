import { 
  users, 
  exercises, 
  userProgress, 
  sessions,
  type User, 
  type Exercise, 
  type UserProgress, 
  type Session,
  type InsertUser, 
  type InsertExercise, 
  type InsertUserProgress, 
  type InsertSession,
  type ExerciseType 
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;

  // Exercise methods
  getExercise(id: number): Promise<Exercise | undefined>;
  getExercisesByType(type: ExerciseType, difficulty?: number): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;

  // Progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserProgressByType(userId: number, exerciseType: ExerciseType): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: number, progress: Partial<UserProgress>): Promise<UserProgress>;

  // Session methods
  createSession(session: InsertSession): Promise<Session>;
  getUserSessions(userId: number, limit?: number): Promise<Session[]>;
  getSessionsByType(userId: number, exerciseType: ExerciseType): Promise<Session[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private exercises: Map<number, Exercise> = new Map();
  private userProgress: Map<number, UserProgress> = new Map();
  private sessions: Map<number, Session> = new Map();
  private currentUserId = 1;
  private currentExerciseId = 1;
  private currentProgressId = 1;
  private currentSessionId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      username: "student",
      currentLevel: 2,
      totalStars: 15,
    };
    this.users.set(1, defaultUser);

    // Create sample exercises
    const sampleExercises: Exercise[] = [
      {
        id: 1,
        type: "addition",
        difficulty: 1,
        problem: { firstNumber: 5, secondNumber: 3, operation: "+", correctAnswer: 8, visualType: "apples" },
        options: [6, 7, 8, 9],
      },
      {
        id: 2,
        type: "subtraction",
        difficulty: 1,
        problem: { firstNumber: 10, secondNumber: 4, operation: "-", correctAnswer: 6, visualType: "stars" },
        options: [5, 6, 7, 8],
      },
      {
        id: 3,
        type: "counting",
        difficulty: 1,
        problem: { objects: 7, visualType: "circles", correctAnswer: 7 },
        options: [6, 7, 8, 9],
      },
      {
        id: 4,
        type: "number_recognition",
        difficulty: 1,
        problem: { number: 15, correctAnswer: 15 },
        options: [13, 14, 15, 16],
      },
      {
        id: 5,
        type: "shapes",
        difficulty: 1,
        problem: { shape: "circle", correctAnswer: "circle" },
        options: ["circle", "square", "triangle", "rectangle"],
      },
      {
        id: 6,
        type: "multiplication",
        difficulty: 3,
        problem: { firstNumber: 6, secondNumber: 4, operation: "×", correctAnswer: 24, visualType: "groups" },
        options: [20, 22, 24, 26],
      },
      {
        id: 7,
        type: "division",
        difficulty: 3,
        problem: { firstNumber: 15, secondNumber: 3, operation: "÷", correctAnswer: 5, visualType: "groups" },
        options: [4, 5, 6, 7],
      },
      {
        id: 8,
        type: "fractions",
        difficulty: 3,
        problem: { numerator: 1, denominator: 2, correctAnswer: "1/2", visualType: "pie" },
        options: ["1/2", "1/3", "1/4", "2/3"],
      },
      {
        id: 9,
        type: "word_problems",
        difficulty: 4,
        problem: { 
          story: "Sarah has 12 stickers. She gives 3 to her friend and buys 7 more. How many stickers does she have now?",
          correctAnswer: 16,
          operation: "mixed"
        },
        options: [14, 15, 16, 17],
      },
      {
        id: 10,
        type: "time_telling",
        difficulty: 2,
        problem: { hours: 3, minutes: 30, correctAnswer: "3:30", visualType: "analog" },
        options: ["3:30", "3:00", "4:30", "2:30"],
      },
    ];

    sampleExercises.forEach(exercise => {
      this.exercises.set(exercise.id, exercise);
    });

    // Create sample progress
    const sampleProgress: UserProgress[] = [
      { id: 1, userId: 1, exerciseType: "addition", completed: 3, total: 5, stars: 3, lastCompletedAt: new Date().toISOString() },
      { id: 2, userId: 1, exerciseType: "subtraction", completed: 2, total: 5, stars: 2, lastCompletedAt: new Date().toISOString() },
      { id: 3, userId: 1, exerciseType: "counting", completed: 4, total: 5, stars: 4, lastCompletedAt: new Date().toISOString() },
      { id: 4, userId: 1, exerciseType: "number_recognition", completed: 5, total: 5, stars: 5, lastCompletedAt: new Date().toISOString() },
      { id: 5, userId: 1, exerciseType: "shapes", completed: 1, total: 5, stars: 1, lastCompletedAt: new Date().toISOString() },
      { id: 6, userId: 1, exerciseType: "multiplication", completed: 2, total: 5, stars: 2, lastCompletedAt: new Date().toISOString() },
      { id: 7, userId: 1, exerciseType: "division", completed: 1, total: 5, stars: 1, lastCompletedAt: new Date().toISOString() },
      { id: 8, userId: 1, exerciseType: "fractions", completed: 0, total: 5, stars: 0, lastCompletedAt: null },
      { id: 9, userId: 1, exerciseType: "word_problems", completed: 0, total: 5, stars: 0, lastCompletedAt: null },
      { id: 10, userId: 1, exerciseType: "time_telling", completed: 1, total: 5, stars: 1, lastCompletedAt: new Date().toISOString() },
    ];

    sampleProgress.forEach(progress => {
      this.userProgress.set(progress.id, progress);
    });

    this.currentUserId = 2;
    this.currentExerciseId = 11;
    this.currentProgressId = 11;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      currentLevel: insertUser.currentLevel || 1,
      totalStars: insertUser.totalStars || 0
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User> {
    const existingUser = this.users.get(id);
    if (!existingUser) throw new Error("User not found");
    
    const updatedUser = { ...existingUser, ...userUpdate };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getExercisesByType(type: ExerciseType, difficulty?: number): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(exercise => 
      exercise.type === type && (difficulty === undefined || exercise.difficulty === difficulty)
    );
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = this.currentExerciseId++;
    const exercise: Exercise = { 
      ...insertExercise, 
      id,
      difficulty: insertExercise.difficulty || 1
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async getUserProgressByType(userId: number, exerciseType: ExerciseType): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(progress => 
      progress.userId === userId && progress.exerciseType === exerciseType
    );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const progress: UserProgress = { 
      ...insertProgress, 
      id,
      completed: insertProgress.completed || 0,
      total: insertProgress.total || 0,
      stars: insertProgress.stars || 0,
      lastCompletedAt: insertProgress.lastCompletedAt || null
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(id: number, progressUpdate: Partial<UserProgress>): Promise<UserProgress> {
    const existingProgress = this.userProgress.get(id);
    if (!existingProgress) throw new Error("Progress not found");
    
    const updatedProgress = { ...existingProgress, ...progressUpdate };
    this.userProgress.set(id, updatedProgress);
    return updatedProgress;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.currentSessionId++;
    const session: Session = { ...insertSession, id };
    this.sessions.set(id, session);
    return session;
  }

  async getUserSessions(userId: number, limit = 50): Promise<Session[]> {
    return Array.from(this.sessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, limit);
  }

  async getSessionsByType(userId: number, exerciseType: ExerciseType): Promise<Session[]> {
    return Array.from(this.sessions.values())
      .filter(session => session.userId === userId && session.exerciseType === exerciseType)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(userUpdate)
      .where(eq(users.id, id))
      .returning();
    if (!user) throw new Error("User not found");
    return user;
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    const [exercise] = await db.select().from(exercises).where(eq(exercises.id, id));
    return exercise || undefined;
  }

  async getExercisesByType(type: ExerciseType, difficulty?: number): Promise<Exercise[]> {
    if (difficulty !== undefined) {
      return await db.select().from(exercises)
        .where(and(eq(exercises.type, type), eq(exercises.difficulty, difficulty)));
    }
    return await db.select().from(exercises).where(eq(exercises.type, type));
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const [exercise] = await db
      .insert(exercises)
      .values(insertExercise)
      .returning();
    return exercise;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async getUserProgressByType(userId: number, exerciseType: ExerciseType): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.exerciseType, exerciseType)));
    return progress || undefined;
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db
      .insert(userProgress)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async updateUserProgress(id: number, progressUpdate: Partial<UserProgress>): Promise<UserProgress> {
    const [progress] = await db
      .update(userProgress)
      .set(progressUpdate)
      .where(eq(userProgress.id, id))
      .returning();
    if (!progress) throw new Error("Progress not found");
    return progress;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const [session] = await db
      .insert(sessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getUserSessions(userId: number, limit = 50): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(sessions.completedAt)
      .limit(limit);
  }

  async getSessionsByType(userId: number, exerciseType: ExerciseType): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .where(and(eq(sessions.userId, userId), eq(sessions.exerciseType, exerciseType)))
      .orderBy(sessions.completedAt);
  }
}

export const storage = new DatabaseStorage();
