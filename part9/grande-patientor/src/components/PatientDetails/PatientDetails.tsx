import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import { useEffect,useState } from "react";
import { Diagnosis, EntryWithoutId, Patient } from "../../types/types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "../EntryDetails";
import { Button } from '@mui/material';
import AddEntryModal from "../AddEntryModal";
import entryService from '../../services/entry';

import axios from 'axios';


interface PatientDetailsProps {
  diagnoses: Diagnosis[];
}

const PatientDetails = ({ diagnoses }: PatientDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitEntry = async(values:EntryWithoutId) => {
    try {
      if (id) {
        const newEntry = await entryService.addEntry(id, values);
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
        closeModal();
      } else {
        setError("Patient ID is missing");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (Array.isArray(error.response?.data)) {
          const messages = error.response.data.map((e: { message: string }) => e.message).join(", ");
          setError(`${messages}`);
        } else {
          setError("Unexpected error occurred.");
        }
      } else {
        console.error(error);
        setError("Unknown error.");
      }
    }
  };

  return (
    <div>
      <h2>{patient.name} {patient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}</h2> 
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <h2 >Entries</h2>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses ={diagnoses}/>
      ))}
      
      <AddEntryModal  
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitEntry}
        error={error}
        diagnoses={diagnoses}        
      /> 
      <Button variant="contained"  onClick={() => openModal()}
      color="primary">ADD NEW ENTRY</Button>
    </div>

  );
};

export default PatientDetails;
