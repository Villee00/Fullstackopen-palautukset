import express from "express";
import { calculateBmi } from "./bmiCalculator";

const server = express();

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
server.listen(3000);