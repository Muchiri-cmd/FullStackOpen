import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import { useEffect,useState } from "react";
import { Diagnosis,  Patient } from "../../types/types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "../EntryDetails";
import { Button } from '@mui/material';

interface PatientDetailsProps {
  diagnoses: Diagnosis[];
}

const PatientDetails = ({ diagnoses }: PatientDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getPatientById(id);
        setPatient(fetchedPatient);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name} {patient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}</h2> 
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses ={diagnoses}/>
      ))}
      <Button variant="contained" color="primary">ADD NEW ENTRY</Button>
    </div>

  );
};

export default PatientDetails;
