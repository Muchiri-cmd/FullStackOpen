import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries/queries"
import { useState } from "react"

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
 
  const [filteredBooks,setFilteredBooks] = useState(null)

  if(books.loading){
    return <div>Loading...</div>
  }

  if (!props.show) {
    return null
  }

  const allGenres = [...new Set (books.data.allBooks.flatMap(book => book.genres))]
  
  const filter = (genre) => {
    const filtered = books.data.allBooks.filter(book => book.genres.includes(genre))
    setFilteredBooks(filtered)
  }

  const displayBooks = filteredBooks || books.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {displayBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={() => setFilteredBooks(null)}>All</button>
      {allGenres.map((genre,index) => (
        <button key={index} onClick={() => filter(genre)}>{genre}</button>
      ))}
     
    </div>
  )
}

export default Books
