import { useField,useResource } from './hooks'


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.input.value })
    content.reset() 
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.input.value, number: number.input.value })
    name.reset() 
    number.reset() 
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button type="submit">create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br />
        number <input {...number.input} />
        <button type="submit">create</button>
      </form>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App
