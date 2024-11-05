import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries/queries"

/* eslint-disable react/prop-types */
const Books = (props) => {
  const books = useQuery(ALL_BOOKS)

  if(books.loading){
    return <div>Loading...</div>
  }

  if (!props.show) {
    return null
  }

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
          {books.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
