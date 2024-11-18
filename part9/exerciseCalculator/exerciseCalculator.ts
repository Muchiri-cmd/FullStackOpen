import { isNotNumber } from "./utils/isNotNumber";

interface Metrics {
  periodLength:number,
  trainingDays:number,
  success:boolean,
  rating:number,
  ratingDescription:string,
  target:number,
  average:number
}
interface Args {
  targetHours : number,
  dailyHours:number[],
};

const parseArgs = (args: string[]): Args => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetHours = Number(args[2]);
  
  if (isNotNumber(targetHours)) {
    throw new Error('Target hours must be a number');
  }
  

  const dailyHours = args.slice(3).map(day => {
    const hours = Number(day);
    if (isNotNumber(hours)) {
      throw new Error("All hours must be numbers");
    }
    return hours;
  });

  return {
    targetHours,
    dailyHours,
  };
};

export const calculateExercises = (days:number[],targetHours:number) : Metrics => {
  const trainingDays = getTrainingDays(days);
  const average = getAverageHours(days);
  const rating = getRating(average,targetHours);

  return{
    periodLength:days.length,
    trainingDays,
    success: average >= targetHours,
    rating,
    ratingDescription:getRatingDescription(rating),
    target:targetHours,
    average,
  };
};

try{
  const { targetHours,dailyHours} = parseArgs(process.argv);
  console.log(calculateExercises(dailyHours,targetHours));
} catch (error:unknown){
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

function getTrainingDays(days:number[]):number{
  return days.filter(day => day > 0).length ;
}

function getRating(average:number,targetHours:number):number{
  if ( average > targetHours * 1.5 ) {
    return 3;
  } else if ( average >= ( targetHours - 0.5)) {
    return 2;
  } else {
    return 1;
  }
}

function getRatingDescription(rating:number):string{
  switch (rating) {
    case 1:
      return "Needs improvement. You fell significantly short of the target.";
    case 2:
      return "Not too bad but could be better.";
    case 3:
      return "Good. Keep putting in the work! ";
    default:
      return "Invalid rating.";
  }
}

function getAverageHours(days:number[]):number{  
  const total = days.reduce((sum,day) => sum + day, 0);
  return total / days.length ;
 
}

