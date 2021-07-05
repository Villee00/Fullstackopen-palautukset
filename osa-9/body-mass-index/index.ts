/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const server = express();

server.use(express.json());

server.get('/hello', (_req, _res) =>{
  _res.send("Hello Full Stack!");
});

server.get('/bmi', (_req, _res) =>{

  const weight = Number(_req.query.weight);
  const height = Number(_req.query.height);

  if(weight && height && !isNaN(weight) && !isNaN(height)){
    const bmi = calculateBmi(height, weight);
    _res.json({
      weight,
      height,
      bmi
    });
  }
  else{
    _res.json({
      error: "malformatted parameters"
    });
  }
});

server.post('/exercises', (req, res) =>{
  const {target, daily_exercises} = req.body;
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  daily_exercises.map((num:number) => {
    if(isNaN(Number(num))){
      res.status(400).json({error: "Values need to be numbers"});
    }
  });
  if(isNaN(Number(target))){
    res.status(400).json({error: "Values need to be numbers"});
  }
  if(!target || !daily_exercises){
    res.status(400).json({
      error: "parameters missing"
    });
  }
  else{
    const response = calculateExercises(target, daily_exercises);

    res.json(response);
  }
});
server.listen(3000);