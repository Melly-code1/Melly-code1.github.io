import { type Exercise, type ExerciseType } from "@shared/schema";

export class ExerciseGenerator {
  static generateAddition(difficulty: number = 1): Exercise {
    const maxNumber = difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20;
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    const sum = num1 + num2;
    
    const visualTypes = ['apples', 'stars', 'hearts', 'flowers'];
    const visualType = visualTypes[Math.floor(Math.random() * visualTypes.length)];
    
    return {
      id: Math.floor(Math.random() * 10000),
      type: "addition",
      difficulty,
      problem: {
        firstNumber: num1,
        secondNumber: num2,
        operation: "+",
        correctAnswer: sum,
        visualType,
      },
      options: this.generateOptions(sum, 4),
    };
  }

  static generateSubtraction(difficulty: number = 1): Exercise {
    const maxNumber = difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20;
    const minuend = Math.floor(Math.random() * maxNumber) + 5;
    const subtrahend = Math.floor(Math.random() * minuend) + 1;
    const difference = minuend - subtrahend;
    
    const visualTypes = ['apples', 'stars', 'hearts', 'flowers'];
    const visualType = visualTypes[Math.floor(Math.random() * visualTypes.length)];
    
    return {
      id: Math.floor(Math.random() * 10000),
      type: "subtraction",
      difficulty,
      problem: {
        firstNumber: minuend,
        secondNumber: subtrahend,
        operation: "-",
        correctAnswer: difference,
        visualType,
      },
      options: this.generateOptions(difference, 4).filter(n => n >= 0),
    };
  }

  static generateCounting(difficulty: number = 1): Exercise {
    const maxCount = difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20;
    const count = Math.floor(Math.random() * maxCount) + 1;
    
    const visualTypes = ['circles', 'stars', 'hearts', 'flowers'];
    const visualType = visualTypes[Math.floor(Math.random() * visualTypes.length)];
    
    return {
      id: Math.floor(Math.random() * 10000),
      type: "counting",
      difficulty,
      problem: {
        objects: count,
        visualType,
        correctAnswer: count,
      },
      options: this.generateOptions(count, 4).filter(n => n > 0),
    };
  }

  static generateNumberRecognition(difficulty: number = 1): Exercise {
    const maxNumber = difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20;
    const number = Math.floor(Math.random() * maxNumber) + 1;
    
    return {
      id: Math.floor(Math.random() * 10000),
      type: "number_recognition",
      difficulty,
      problem: {
        number,
        correctAnswer: number,
      },
      options: this.generateOptions(number, 4).filter(n => n > 0),
    };
  }

  static generateShapes(difficulty: number = 1): Exercise {
    const shapes = ["circle", "square", "triangle", "rectangle"];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const otherShapes = shapes.filter(s => s !== shape);
    
    return {
      id: Math.floor(Math.random() * 10000),
      type: "shapes",
      difficulty,
      problem: {
        shape,
        correctAnswer: shape,
      },
      options: [shape, ...otherShapes.slice(0, 3)].sort(() => Math.random() - 0.5),
    };
  }

  private static generateOptions(correctAnswer: number, count: number): number[] {
    const options = [correctAnswer];
    const variations = [-2, -1, 1, 2, 3, -3];
    
    while (options.length < count) {
      const variation = variations[Math.floor(Math.random() * variations.length)];
      const option = correctAnswer + variation;
      
      if (option > 0 && !options.includes(option)) {
        options.push(option);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  }
}
