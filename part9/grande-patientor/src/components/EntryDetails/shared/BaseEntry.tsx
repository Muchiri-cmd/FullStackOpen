import { Card, CardContent, Typography, Divider } from "@mui/material";
import { Entry } from "../../../types/types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const BaseEntry = ({ children, entry }: { children?: React.ReactNode; entry: Entry }) => (
  <Card key={entry.id} sx={{ marginBottom: 2, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {entry.date}&nbsp;
        {entry.type === 'HealthCheck' ? <MedicalServicesIcon /> 
        : entry.type === 'OccupationalHealthcare' ? <WorkIcon /> 
        : entry.type === 'Hospital' ? <LocalHospitalIcon /> 
        : null}
      </Typography>
      <Typography variant="body1" paragraph>
        {entry.description}
      </Typography>
      
      <Typography variant="body1" paragraph>
        diagnose by {entry.specialist}
      </Typography>
      {children}
    </CardContent>
    <Divider />
  </Card>
  
);

export default BaseEntry;