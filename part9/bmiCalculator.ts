const calculateBMI = (height:number,weight:number) : string=> {
  //kg/m^2
  height = (height / 100);
  let bmi : number = weight / Math.pow(height,2);

  if ( bmi < 18.5) return "Underweight"
  if( bmi >= 18.5 && bmi <= 24.9) return "Normal Weight";
  if ( bmi >=25 && bmi <= 29.9) return "Overweight";
  if (bmi >= 30) return "Obese"
  
  return "Kindly confirm you entered the correct height and weight"

}

console.log(calculateBMI(180,74))