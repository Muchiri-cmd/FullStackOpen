import { Dialog, DialogTitle, DialogContent, Divider,Alert } from '@mui/material';
import EntryForm from './EntryForm';
import { Diagnosis, EntryWithoutId } from '../../types/types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit:(values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit,error,diagnoses }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <EntryForm onCancel={onClose} onSubmit={onSubmit} diagnoses={diagnoses}/>
    </DialogContent> 
  </Dialog>
);

export default AddEntryModal;