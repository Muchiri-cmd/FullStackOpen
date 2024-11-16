interface Metrics {
  periodLength:number,
  trainingDays:number,
  success:boolean,
  rating:number,
  ratingDescription:string,
  target:number,
  average:number
}
 

const calculateExercises = (days:number[],targetHours:number) : Metrics => {
  return{
    periodLength:days.length,
    trainingDays:getTrainingDays(days),
    success:detemineSuccess(days,targetHours),
    rating:getRating(days),
    ratingDescription:getRatingDescription(getRating(days)),
    target:targetHours,
    average:getAverageHours(days)
  }
}

function getTrainingDays(days:number[]):number{
  let trainingDays = 0;
  for (let day of days){
      if (day !== 0 ){
        trainingDays ++;
      }
    }
  return trainingDays
}

function detemineSuccess(days:number[],targetHours:number):boolean{
  for (let day of days){
    if (day < targetHours ) return false
  }
  return true
}

function getRating(days:number[]):number{
  let trainingDays = getTrainingDays(days);
  if ( trainingDays <= 2) return 1;
  if ( trainingDays <= 5) return 2;
  if ( trainingDays > 5 ) return 3;
}

function getRatingDescription(rating:number):string{
  if ( rating == 1 ) return "Too bad.Consistency is king !";
  if ( rating == 2) return "Not too bad but could be better";
  if ( rating == 3 ) return "Good , now make it better.Consistency is the game "
}

function getAverageHours(days:number[]):number{  
  let total:number = 0;
  for(let day of days){
    total += day;
  }
  return total/days.length;
 
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));