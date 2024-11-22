interface CoursePartBase {
  name:string;
  exerciseCount:number;
}

interface CoursePartDescription extends CoursePartBase{
  description:string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind:"basic"
};

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount:number;
  kind:"group";
};

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial:string;
  kind:"background"
};

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial ;

const Header = (props: { name: string }) => {
  return <h1>{props.name}</h1>
}

const Part = (props: { part: CoursePart }) => {
  const { part } = props;

  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name} ({part.kind})</strong><br />
          {part.description}<br />
          Exercises: {part.exerciseCount}
        </p>
      );

   
    case "group":
      return (
        <p>
          <strong>{part.name} ({part.kind})</strong><br />
          Exercises: {part.exerciseCount}<br />
          Group Projects: {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>{part.name} ({part.kind})</strong><br />
          {part.description}<br />
          Exercises: {part.exerciseCount}<br />
          Background Material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>{part.name} ({part.kind})</strong><br />
          {part.description}<br />
          Exercises: {part.exerciseCount}<br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part); 
  }
};

const Content = (props:{courseParts: CoursePart[]}) => {
  return (
    <>
     {props.courseParts.map((part,index) => (
      <Part key={index} part={part}/>
     ))}
    </>
     
  )
}

const Total = (props:{total:number}) => {
  return <p>Number of exercises {props.total}</p>
}

const assertNever = (value:never) :never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  courseParts.forEach(part => {
      switch(part.kind){
        case "basic":
          console.log(part.name,part.description,part.exerciseCount);
          break;
        case "group":
          console.log(part.name,part.exerciseCount,part.groupProjectCount);
          break;
        case "background":
          console.log(part.name,part.exerciseCount,part.backgroundMaterial);
          break;
        case "special":
          console.log(part.name, part.exerciseCount, part.requirements);
          break;
        default:
          return assertNever(part);
      }
    });

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total total={totalExercises}/>
    </div>
  );
};

export default App;