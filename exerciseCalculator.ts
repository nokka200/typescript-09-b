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
};

const parseArgumentsCalculator = (args: string[]): Userinput => {
    const temp: number[] = args.slice(2).map(str => parseFloat(str));
    const target = temp[0];
    const dailyExercises: number[] = temp.slice(1);

    return {
        dailyExercises,
        target
    };
};

if (require.main === module) {
    const { dailyExercises, target } = parseArgumentsCalculator(process.argv);
    //const value = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
    const value = calculateExercises(dailyExercises, target);
    console.log(value);
}

export { ExerciseValues, Userinput, calculateExercises };