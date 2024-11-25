import { Paper, Typography, List, ListItem } from "@mui/material";

const DiagnosisList = ({ codes, getCodeDescription }: { codes: string[]; getCodeDescription: (code: string) => string }) => (
  <Paper sx={{ padding: 2, marginBottom: 2 }}>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Diagnosis Codes:
    </Typography>
    <List>
      {codes.map((code, index) => (
        <ListItem key={index}>
          <Typography variant="body2" color="textPrimary">
            {code} - {getCodeDescription(code)}
          </Typography>
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default DiagnosisList;
