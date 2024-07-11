import { useState,useEffect } from "react";
import personServices from './services/persons'
import Filter from "./components/filter";
import Form from "./components/form";
import Persons from "./components/persons";
import Notification from "./components/notification";

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

  const [message,setMessage] = useState(null)
  const [error,setError] = useState(null)

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
           setMessage(`${person.name}'s record successfully updated`)
           setTimeout(()=>{
            setMessage(null)
          },1500)
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
          setMessage(`${personData.name}'s record added successfully.`)
          setTimeout(()=>{
            setMessage(null)
          },1500)
        }).catch(err => {
          console.log(err);
          setError('Error adding person. Please try again.');
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
        setMessage(`${person.name}'s record deleted successfully`)
        setTimeout(()=>{
          setMessage(null)
        },2000)
      }).catch(err => {
        console.log(err);
        setError(`Couldn't delete ${person.name}'s record . Check his record for errors `)
        setTimeout(()=>{
          setError(null)
        },2000)
      });
  }

  return (
    <>
      <div className="header">
      <h1>Phonebook</h1>
      <Filter value={searchVal} onChange={handleSearch}/>
      </div>
  
      <Notification message={message} error={error}/>

      <h2>Add a new record</h2>
      <Form 
        onSubmit={handleSubmit}
        name={newName}
        handleNameField={handleNameField}
        number={newNumber}
        handleNumberField={handleNumberField}
      />

      <h2>Phonebook Records</h2>
      <Persons list={filteredPersons} deleteRecord={deleteRecord}/>
    </>
  )
}
export default App