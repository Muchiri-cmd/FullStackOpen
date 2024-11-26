import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import { useState,SyntheticEvent } from 'react';
import { HealthCheckEntryFormValues } from '../../types/types';

interface Props {
  onCancel: () => void;
  onSubmit:(values: HealthCheckEntryFormValues) => void;
}

const EntryForm = ({onCancel,onSubmit }:Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState(['']);
  
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes
    });
  };

  return (
    <div>
      <h2>New HealthCheck Entry</h2>
      <form onSubmit={addEntry}>
        
        <TextField
          label="Description"
          fullWidth
          value={description}
          required
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField style={{ marginTop: 10 }}
          label="Date"
          fullWidth
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField style={{ marginTop: 10 }}
          label="Specialist"
          fullWidth
          value={specialist}
          required
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 10 }}>HealthCheck Rating</InputLabel>
        <Select
          label="HealthCheck Rating"
          fullWidth
          value={healthCheckRating}
          onChange={(event: SelectChangeEvent<number>) => 
            setHealthCheckRating(Number(event.target.value))
          }
        >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>LowRisk</MenuItem>
          <MenuItem value={2}>HighRisk</MenuItem>
          <MenuItem value={3}>CriticalRisk</MenuItem>
        </Select>

        <TextField style={{ marginTop: 10 }}
          name="DiagnosisCodes"
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
        />

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
