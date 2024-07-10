import { useState,useEffect } from "react";
import personServices from './services/persons'

const Filter = ({value,onChange}) => {
  return (
    <>
       <label> filter shown with
          <input value={value} onChange={onChange}/>
      </label>
    </>
  )
}
const Form = ({name,handleNameField,number,handleNumberField,onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
          <div>
            <label>name:
              <input value={name} onChange={handleNameField} />
            </label>
          </div>

          <div>
            <label>
              number : <input value={number} onChange={handleNumberField}/>
            </label>
          </div>

          <div>
            <button type="submit">add</button>
          </div>
    </form>
  )
}
const Persons  = ({list,deleteRecord}) => {
  return(
    <>
      {list.map(person => 
        <Person key={person.id} id={person.id} name={person.name} number={person.phoneNumber} deleteRecord={deleteRecord}/>
      )}
    </>
  )
}
const Person = ({name,number,id,deleteRecord}) => {
  return (
    <div style={{margin: 1.5 + 'em'}}>
      <span>{name} - {number}</span>
      <button 
        style={{marginLeft: 1.5 + 'em'}}
        onClick={() => deleteRecord(id)}
        >Delete
      </button>
    </div>
  )
} 

const App = () => {
  const[persons,setPersons] = useState([])

  useEffect(()=>{
    personServices
      .getPeople()
      .then(peopleData => {
        setPersons(peopleData)
        setFilteredPersons(peopleData)
      })
  },[])

  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [searchVal,setNewSearchVal] = useState('')

  const handleNameField = (e) => setNewName(e.target.value)
  const handleNumberField = (e) => setNewNumber(e.target.value)

  const handleSearch = (e) => {
    const query = e.target.value
    setNewSearchVal(query)
    if (query === ''){
      setFilteredPersons(persons)
    } else {
      const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
      setFilteredPersons(filteredPeople)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const generatedId =  String(persons.length ? Math.max(...persons.map(p => p.id)) + 1 : 1)
    
    const newPerson = { 
      name:newName.trim(),
      phoneNumber:newNumber.trim(),
      id: generatedId
    }
    const exists = persons.find(person => person.name === newName)

    if (exists) {
      const id = exists.id
      const person = persons.find(p => p.id === id )
      const updatedPerson = {...person,phoneNumber:newNumber}

      window.confirm(`${newName} is already added to phonebook, replace old number with a new one ?`)

      personServices
        .updateRecord(id,updatedPerson)
        .then(returnedPerson =>{
           setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
           setFilteredPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
      setNewName('')
      setNewNumber('')
  
    } else {
      personServices
        .addPerson(newPerson)
        .then(personData => {
          setPersons(persons.concat(personData))
          setFilteredPersons(persons.concat(personData))
          setNewName('')
          setNewNumber('')
        }).catch(err => {
          console.log(err);
          alert('Error adding person');
        });
    }
  }

  const deleteRecord = (id) => {
   
    const person = persons.find(p => p.id === id)
    window.confirm(`Are you sure you want to delete ${person.name}'s record`)
    
    personServices
      .deletePerson(id)
      .then(() => {
        const updatedPersons = persons.filter(p => p.id !== id);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);

      }).catch(err => {
        console.log(err);
        // alert(`The person ${person.name} was already deleted from server`);
        alert(`Couldn't delete ${person.name}'s record . Check his record for errors `)
        const updatedPersons = persons.filter(p => p.id !== id);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
      });
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={searchVal} onChange={handleSearch}/>
      
      <h3>Add a new</h3>
      <Form 
        onSubmit={handleSubmit}
        name={newName}
        handleNameField={handleNameField}
        number={newNumber}
        handleNumberField={handleNumberField}
      />

      <h2>Numbers</h2>
      <Persons list={filteredPersons} deleteRecord={deleteRecord}/>
    </>
  )
}
export default App