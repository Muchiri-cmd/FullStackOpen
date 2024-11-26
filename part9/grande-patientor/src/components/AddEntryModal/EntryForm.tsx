import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent,Checkbox,ListItemText } from '@mui/material';
import { useState,SyntheticEvent } from 'react';
import { Diagnosis, EntryWithoutId } from '../../types/types';

interface Props {
  onCancel: () => void;
  onSubmit:(values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

const EntryForm = ({onCancel,onSubmit,diagnoses }:Props) => {
  const [entryType, setEntryType] = useState('HealthCheck');

  //HealthCheckEntry
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState(['']);

  //Occupational HealthCareEntry
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  //HospitalEntry
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleEntryTypeChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value);
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    
    setDiagnosisCodes(
      //remove falsy values from array
      typeof value === 'string' ? value.split(',').filter(Boolean) : value.filter(Boolean)
    );
  };
  

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch(entryType){
      case 'HealthCheck':
        onSubmit({
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes
        });
        break;

      case 'OccupationalHealthcare':
        onSubmit({
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          employerName,
          sickLeave: {
            startDate: new Date (sickLeaveStartDate),
            endDate: new Date( sickLeaveEndDate )
          }
        });
        break;

      case 'Hospital':
        onSubmit({
          type: "Hospital",
          description,
          date,
          specialist,
          discharge: {
            date: new Date(dischargeDate),
            criteria: dischargeCriteria
          }
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Entry Type</InputLabel>
        <Select
          fullWidth
          value={entryType}
          onChange={handleEntryTypeChange}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white', 
            borderRadius: 2,
            border: '2px solid #1976d2',
            '& .MuiSelect-icon': {
              color: 'white', 
            },
          
          }}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>

        <TextField
          label="Description"
          fullWidth
          value={description}
          required
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginTop: 10 }}
        />

        <TextField
          label="Date"
          fullWidth
          type="date"
          value={date}
          required
          onChange={({ target }) => setDate(target.value)}
          style={{ marginTop: 10 }}
          InputLabelProps={{
            shrink: true, 
          }}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          required
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginTop: 10 }}
        />

        {entryType === 'HealthCheck' && (
          <>
            <InputLabel style={{ marginTop: 10 }}>HealthCheck Rating</InputLabel>
            <Select
              fullWidth
              value={healthCheckRating}
              onChange={(event: SelectChangeEvent<number>) => setHealthCheckRating(Number(event.target.value))}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>LowRisk</MenuItem>
              <MenuItem value={2}>HighRisk</MenuItem>
              <MenuItem value={3}>CriticalRisk</MenuItem>
            </Select>
          </>
        )}

        {entryType === 'OccupationalHealthcare' && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              style={{ marginTop: 10 }}
            />
            <TextField
              label="Sick Leave Start Date"
              fullWidth
              type="date"
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              style={{ marginTop: 10 }}
              InputLabelProps={{
                shrink: true, 
              }}
            />
            <TextField
              label="Sick Leave End Date"
              fullWidth
              type="date"
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              style={{ marginTop: 10 }}
              InputLabelProps={{
                shrink: true, 
              }}
            />
          </>
        )}

        {entryType === 'Hospital' && (
          <>
            <TextField
              label="Discharge Date"
              fullWidth
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              style={{ marginTop: 10 }}
              InputLabelProps={{
                shrink: true, 
              }}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              required
              onChange={({ target }) => setDischargeCriteria(target.value)}
              style={{ marginTop: 10 }}
            />
          </>
        )}

        <InputLabel style={{ marginTop: 10 }}>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisChange}
            fullWidth
            renderValue={(selected) => selected.join(', ')}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox checked={diagnosisCodes.indexOf(diagnosis.code) > -1} />
                <ListItemText primary={diagnosis.name} />
              </MenuItem>
            ))}
        </Select>


        <Grid style={{ marginTop: 5 }}>
          <Grid item>
            <Button
              color="error"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EntryForm;
