import express from 'express';
const app = express();
import { calculateBmi } from './calculateBmi';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
  try {
    const height: number = Number(req.query.height as string);
    const weight: number = Number(req.query.weight as string);
    const result: string = calculateBmi(height, weight);

    res.json({ height, weight, result });
  } catch (error) {
    console.log(error);
    res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.json({ error: 'parameters missing' });
  }
  try {
    const dailyExercises: number[] = req.body.daily_exercises as Array<number>;
    const target: number = Number(req.body.target as string);
    if (!Array.isArray(dailyExercises) || isNaN(target)) {
      res.json({ error: 'malformatted parameters' });
    }
    const value = calculateExercises(dailyExercises, target);
    res.json(value);
  } catch (error) {
    console.log(error);
    res.json(error);
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
