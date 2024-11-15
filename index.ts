import express from 'express';
const app = express();
import { calculateBmi }  from './calculateBmi';

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
    res.json({ error: "malformatted parameters" });
  }
});




const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});