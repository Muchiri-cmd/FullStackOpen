import { useQuery } from "@apollo/client"
import { ALL_BOOKS, FILTERED_BOOKS } from "../queries/queries"
import { useState } from "react"

const Books = ({ show, genre,setGenre }) => {
  const [filtered, setFiltered] = useState(false)

  const books = useQuery(ALL_BOOKS)

  const filteredBooks = useQuery(FILTERED_BOOKS,{
    variables : { genre},
    skip:!genre
  })
 
  if(books.loading){
    return <div>Loading...</div>
  }

  if (!show) {
    return null
  }

  const allGenres = [...new Set (books.data.allBooks.flatMap(book => book.genres))]
  
  const displayBooks = filtered ? filteredBooks?.data?.allBooks : books?.data?.allBooks

  const setFilter = (genre) => {
    setGenre(genre)
    setFiltered(true)
  }

  const unsetFilter = () => {
    setGenre('')
    setFiltered(false)
  }

  return (
    <div>
      <h2>books</h2><strong>Genre: {genre ? genre:'All'}</strong>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {displayBooks?.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={unsetFilter}>All</button>

      {allGenres.map((genre,index) => (
        <button key={index} onClick={() => setFilter(genre)}>{genre}</button>
      ))}
     
    </div>
  )
}

export default Books
