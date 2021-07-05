
const parseArguments = (args: Array<string>) =>{
  if(args.length !== 4){
    throw new Error('Invalid amount of args');
  }
  const height = Number(args[2]);
  const weight = Number(args[3]);

  if(!isNaN(height) && !isNaN(weight)){
    console.log(calculateBmi(height, weight));
  }
  else{
    throw new Error('Invailid input (values need to be numbers)');
  }
};

const calculateBmi = (height: number, weight: number) =>{
  const bmi = weight/((height/100)^2);
  if(bmi > 30){
    return "Obese";
  }
  else if(bmi > 25){
    return "Overweight";
  }
  else if(bmi > 18.5){
    return "Normal (healthy weight)";
  }
  else if(bmi > 16){
    return "Underweight";
  }
  else if(bmi > 15){
    return "Severely underweight";
  }
  else{
    return "Very severely underweight";
  }
};

export {calculateBmi, parseArguments};