interface BmiValues {
  height:number;
  weight:number;
}

const parseArguments = (args:string[]):BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[3])) && isNaN(Number(args[4]))){
    return {
      height:Number(args[2]),
      weight:Number(args[3])
    }
  } else {
    throw new Error('Provided values were not valid')
  }
}

export const calculateBMI = (height:number,weight:number) : string=> {
  //kg/m^2
  try {

    height = (height / 100); //convert height into meters
    let bmi : number = weight / Math.pow(height,2);

    if ( bmi < 18.5) return "Underweight"
    if( bmi >= 18.5 && bmi <= 24.9) return "Normal Weight";
    if ( bmi >=25 && bmi <= 29.9) return "Overweight";
    if (bmi >= 30) return "Obese"
  
  return "Kindly confirm you entered the correct height and weight"

  }catch(error:unknown){
    let errorMessage = 'Something bad happened: '
    if (error instanceof Error){
      errorMessage += error.message
    }
    console.log(errorMessage)
    return errorMessage
  }
}

if (require.main === module){
  try {
    let { height,weight} = parseArguments(process.argv);
    console.log(calculateBMI(height, weight));
  } catch(error:unknown){
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
  }
}
