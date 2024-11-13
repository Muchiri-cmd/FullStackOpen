import { useQuery } from "@apollo/client"
import { FILTERED_BOOKS } from "../queries/queries"
import { GETFAVOURITEGENRE } from "../queries/queries"

const Recommendations = (props) => {
  const {data:userData , loading:userLoading } = useQuery(GETFAVOURITEGENRE)
  const favoriteGenre = userData?.me?.favoriteGenre

  const { data:booksData,loading:booksLoading } = useQuery(FILTERED_BOOKS,{
    variables:{ genre: favoriteGenre },
    skip: !favoriteGenre 
  })
  
  if(!props.show){
    return null
  }

  if (userLoading) return <div>Loading user data...</div>
  if (booksLoading) return <div>Loading recommended books...</div>
  
  
  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre
        <strong> {favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData?.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommendations
