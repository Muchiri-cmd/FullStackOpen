import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from '../../backend/src/types';
import { getDiaryEntries,createEntry } from './services/diaryService';
import Entries from './components/Entries';
import Notify from './components/Notify';
import Form from './components/Form';

const App = () => {
  const [entries,setEntries] = useState<DiaryEntry[]>([]);
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');

  useEffect(()=>{
    getDiaryEntries().then(data => {
      setEntries(data)
    })
  },[]);

  const addEntry = (entry:NewDiaryEntry) => {
    createEntry(entry)
      .then((data) => {
        setEntries(entries.concat(data));
        setMessage('Entry added successfully');
        setTimeout(() => setMessage(''), 5000);
      })
      .catch((error) => {
        setError(error.response.data || 'Failed to add entry');
        setTimeout(() => setError(''), 5000);
      })
  }

  return (
    <>
      <Notify message={message} error={error}/>
      <h2>Add New Entry</h2>
      <Form addEntry={addEntry}/>
      <Entries entries={entries}/>
    </>
    
  )
}


export default App