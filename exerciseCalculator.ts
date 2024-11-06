interface ExerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Userinput {
    dailyExercises: Array<number>;
    target: number;
}

const calculateExercises = (dailyExercises: number[], target: number): ExerciseValues => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter(day => day > 0).length;
    const totalHours = dailyExercises.reduce((sum, day) => sum + day, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
    let rating: number;
    let ratingDescription: string;

    if (average > target) {
        rating = target;
        ratingDescription = 'Great job! you overdid yourself!';
    } else if (average === target) {
        rating = 3;
        ratingDescription = 'Good job! you reached your target.';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better.';
    } else {
        rating = 1;
        ratingDescription = 'You need to work harder.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

const parseArgumentsCalculator = (args: string[]): Userinput => { 
    if (args.length < 10) throw new Error('Not enough arguments');
    if (args.length > 10) throw new Error('Too many arguments');

    const numbers = args.slice(1).map(str => parseFloat(str));

    return null;
  }

const value = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(value);