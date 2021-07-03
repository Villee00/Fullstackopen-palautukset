const calculateBmi = (height: number, weight: number) =>{
  const bmi = weight/((height/100)^2)
  if(bmi > 30){
    return "Obese"
  }
  else if(bmi > 25){
    return "Overweight"
  }
  else if(bmi > 18.5){
    return "Normal (healthy weight)"
  }
  else if(bmi > 16){
    return "Underweight"
  }
  else if(bmi > 15){
    return "Severely underweight"
  }
  else{
    return "Very severely underweight"
  }
}


console.log(calculateBmi(180, 74))
