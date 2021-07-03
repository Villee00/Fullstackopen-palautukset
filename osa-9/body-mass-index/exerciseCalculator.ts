interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


const calculateExercises = (target: number, exerciseAmount: Array<number>) : result=> {
  let totalHoursTraining = 0
  let rating = 0
  let ratingDescription = ""
  exerciseAmount.map(n => totalHoursTraining +=n)

  const average = totalHoursTraining / exerciseAmount.length

  if(average < target * 0.7){
    rating = 1
    ratingDescription = "bad"
  }
  else if(average < target){
    rating = 2
    ratingDescription = "not too bad but could be better"
  }
  else{
    rating = 3
    ratingDescription = "Good"
  }
  return{
    periodLength: exerciseAmount.length,
    trainingDays: exerciseAmount.filter(n => n > 0).length,
    success: exerciseAmount.filter(n => n > 0).length > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}


console.log(calculateExercises(2,[3, 0, 2, 4.5, 0, 3, 1]))