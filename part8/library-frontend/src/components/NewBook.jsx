import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS,FILTERED_BOOKS } from '../queries/queries'

const NewBook = ({ show,setPage,selectedGenre,setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, { data: { addBook } }) => {    
      const { allBooks } = cache.readQuery({ query: ALL_BOOKS })

      if (!allBooks.find(book => book.id === addBook.id)) {
        cache.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: allBooks.concat(addBook) },
        });
      }
  
      if (selectedGenre) {
        const data = cache.readQuery({
          query: FILTERED_BOOKS,
          variables: { genre: selectedGenre },
        })

        const filteredBooks = data ? data.allBooks : []
        const newBook = addBook ? addBook : {}
      
        if(!filteredBooks.find(book => book.id === addBook.id)){
          cache.writeQuery({
          query: FILTERED_BOOKS,
          variables: { genre: selectedGenre },
          data: { allBooks: [...filteredBooks, newBook] },
          })
        }
      }
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      setTimeout(() => {
        setError(null)
      },3500)
    }
  });

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const publishedYear = parseInt(published, 10);

    addBook({ variables: { title,published:publishedYear, author, genres }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    setPage("books")
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook