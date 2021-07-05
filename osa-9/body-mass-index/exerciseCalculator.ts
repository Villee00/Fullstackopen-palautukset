interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArgumentsCalc = (args: Array<string>) =>{
  if(args.length < 4){
    throw new Error('You need to give target and days values');
  }

  const target = Number(args[2]);
  if(isNaN(target)){
    throw new Error('target hours must be valid number');
  }

  const days = args.slice(3).map(n => {
    if(!isNaN(Number(n))){
      return Number(n);
    }
    else{
      throw new Error('Only input numbers');
    }
  }); 
  console.log(calculateExercises(target, days));
};

const calculateExercises = (target: number, exerciseAmount: Array<number>) : result=> {
  let totalHoursTraining = 0;
  let rating = 0;
  let ratingDescription = "";
  exerciseAmount.map(n => totalHoursTraining +=n);

  const average = totalHoursTraining / exerciseAmount.length;

  if(average < target * 0.7){
    rating = 1;
    ratingDescription = "bad";
  }
  else if(average < target){
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }
  else{
    rating = 3;
    ratingDescription = "Good";
  }

  return{
    periodLength: exerciseAmount.length,
    trainingDays: exerciseAmount.filter(n => n > 0).length,
    success: average > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

// parseArgumentsCalc(process.argv);
export {calculateExercises, parseArgumentsCalc};