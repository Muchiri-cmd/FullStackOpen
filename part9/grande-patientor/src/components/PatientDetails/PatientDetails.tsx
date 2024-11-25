import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import { useEffect,useState } from "react";
import { Diagnosis, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

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

  const getCodeDescription = (code: string) => {
    const result = diagnoses.find((diag: Diagnosis) => diag.code === code);
    return result?.name;
  };

  return (
    <div>
      <h2>{patient.name} {patient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}</h2> 
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.date}  {entry.description}</p>
          
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
              {entry.diagnosisCodes.map((code, index) => (
                <li key={index}>{code} - {getCodeDescription(code)}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>

  );
};

export default PatientDetails;
