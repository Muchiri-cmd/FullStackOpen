import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries/queries"
import Select from 'react-select';


const BirthYearForm = () => {
  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const authors = useQuery(ALL_AUTHORS)
 
  const authorOptions = authors?.data?.allAuthors.map(author => ({
    value: author.name,
    label: author.name, 
  }));

  const [ changeBirthYear ] = useMutation(EDIT_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()

    const bornYear = parseInt(born, 10);

    changeBirthYear({ variables: { name:selectedAuthor.value, setBornTo: bornYear } });

    setSelectedAuthor(null);
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="author-select">Select Author</label>
          <Select
            id="author-select"
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorOptions}
            isClearable 
          />
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm
