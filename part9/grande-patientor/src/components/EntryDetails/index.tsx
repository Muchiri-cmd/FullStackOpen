import { Entry,Diagnosis } from "../../types/types";
import HospitalEntry from "./Entries/HospitalEntry";
import OccupationalEntry from "./Entries/OccupationalEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";

interface EntryDetailProps {
  entry:Entry;
  diagnoses:Diagnosis[];
}

const EntryDetails = ({entry,diagnoses} : EntryDetailProps) => {
  switch(entry.type){
    case "Hospital":
      return <HospitalEntry entry={entry} diagnosis={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry} diagnosis={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnosis={diagnoses}/>;
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryDetails;