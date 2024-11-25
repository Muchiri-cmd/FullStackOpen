import { EntryDetailProps } from "../../../types/types";  
import useDiagnosis from "../../../hooks/useDiagnosis";
import BaseEntry from "../shared/BaseEntry";
import DiagnosisList from "../shared/DiagnosisList";


const OccupationalEntry = ({ entry, diagnosis } : EntryDetailProps) => {
  const { getCodeDescription } = useDiagnosis(diagnosis);

  return (
    <BaseEntry entry={entry}>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <DiagnosisList codes={entry.diagnosisCodes} getCodeDescription={(code) => getCodeDescription(code) || "Unknown diagnosis"} />
      )}
    </BaseEntry>
  );
};

export default OccupationalEntry;
