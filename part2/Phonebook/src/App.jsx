import { useState } from "react";

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
const Persons  = ({list}) => {
  return(
    <>
      {list.map(person => 
        <Person key={person.id} name={person.name} number={person.phoneNumber}/>
      )}
    </>
  )
}
const Person = ({name,number}) => <p>{name} - {number}</p>

const App = () => {
  const[persons,setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ])
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
    // console.log('Submitting ---');
    event.preventDefault()
    
    const newPerson = { 
      name:newName,
      phoneNumber:newNumber,
      id: persons.length ? Math.max(...persons.map(p => p.id)) + 1 : 1
    }
    const exists = persons.find(person => person.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook, try another name`)
      setNewName('')
      return
    } else {
      setPersons(persons.concat(newPerson))
      setFilteredPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
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
      <Persons list={filteredPersons}/>
    </>
  )
}

export default App