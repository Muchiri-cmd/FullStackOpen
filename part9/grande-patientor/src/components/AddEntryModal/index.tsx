import { Dialog, DialogTitle, DialogContent, Divider,Alert } from '@mui/material';
import EntryForm from './EntryForm';
import { HealthCheckEntryFormValues } from '../../types/types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit:(values: HealthCheckEntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit,error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <EntryForm onCancel={onClose} onSubmit={onSubmit}/>
    </DialogContent> 
  </Dialog>
);

export default AddEntryModal;