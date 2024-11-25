import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import { useEffect,useState } from "react";
import { Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientDetails = () => {
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
      <h2>{patient.name} { patient.gender === 'female' ? <FemaleIcon /> : <MaleIcon /> }</h2> 
      <p>ssh: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      
    </div>
  );
};

export default PatientDetails;
