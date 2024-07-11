import { useState,useEffect } from "react";
import personServices from './services/persons'

const Filter = ({value,onChange}) => {
  return (
    <div className="search">
       <label> <h3>Search By Name </h3>
          <input className ="searchInput" value={value} onChange={onChange} placeholder="John Doe ..."/>
      </label>
    </div>
  )
}
const Form = ({name,handleNameField,number,handleNumberField,onSubmit}) => {
  return (
    <form onSubmit={onSubmit} className="form">
          <div className="input-wrapper">
            <label>name:(e.g John Doe)
              <input value={name} onChange={handleNameField} type="text" required/>
            </label>
          </div>

          <div className="input-wrapper">
            <label>number : (e.g 012345678)
              <input value={number} onChange={handleNumberField} type="text" required/>
            </label>
          </div>

          <div className="button-container">
            <button className="submit-btn" type="submit">add</button>
          </div>
    </form>
  )
}
const Persons  = ({list,deleteRecord}) => {
  return(
    <table>
      <thead>
        <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {list.map(person => 
              <Person key={person.id} id={person.id} name={person.name} number={person.phoneNumber} deleteRecord={deleteRecord}/>
        )}
      </tbody>
      </table>
  )
}
const Person = ({name,number,id,deleteRecord}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td><button className="delete-btn" onClick={() => deleteRecord(id)}>Delete</button></td>
    </tr>
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

  const Notification = ({message,error}) => {
    const msgBoxStyles = {
      color: 'green',
      fontSize: '13px',
      backgroundColor: 'whitesmoke',
      borderRadius: '8px',
      height: 'auto',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      marginBottom: '20px',
      border: '1px solid green',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      maxWidth: '500px'
    } 
    const errorBoxStyles = {
      ...msgBoxStyles,
      color:'red',
      border:'1px solid red'
    }
    if (message === null && error === null)return null
    if (message !== null){
      return(
        <div className="msgBox" style={msgBoxStyles}>
          {message}
        </div>
      )
    } else if (error !== null){
      return(
        <div className="errBox" style={errorBoxStyles}>
          {error}
        </div>
      )
    }
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