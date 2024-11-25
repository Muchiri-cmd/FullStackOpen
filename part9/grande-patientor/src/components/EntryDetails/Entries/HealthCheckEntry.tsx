import { EntryDetailProps } from "../../../types/types";
 import useDiagnosis from "../../../hooks/useDiagnosis"; 
import BaseEntry from "../shared/BaseEntry";
import DiagnosisList from "../shared/DiagnosisList";
import { Favorite } from "@mui/icons-material";

const HealthCheckEntry = ({ entry, diagnosis } : EntryDetailProps) => {
  const { getCodeDescription } = useDiagnosis(diagnosis);
  return (
    <BaseEntry entry={entry}>
      <span>
        {entry.type === 'HealthCheck' && (
          <Favorite
            sx={{
              color: 
                entry.healthCheckRating === 0 ? 'green' : 
                entry.healthCheckRating === 1 ? 'yellow' : 
                entry.healthCheckRating >= 2 ? 'orange' :
                entry.healthCheckRating >= 2 ? 'red' : 'inherit'
            }}
          />
        )}
      </span>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <DiagnosisList codes={entry.diagnosisCodes} getCodeDescription={(code) => getCodeDescription(code) || "Unknown diagnosis"} />
      )}
    </BaseEntry>
  );
};


export default HealthCheckEntry;
