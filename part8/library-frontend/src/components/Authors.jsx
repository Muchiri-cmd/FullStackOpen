import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries/queries"
import BirthYearForm from "./BirthYearForm"


const Authors = ({ show, token }) => {
  const authors = useQuery(ALL_AUTHORS)
  
  if (!show) {
    return null
  }

  if (authors.loading){
    return <div>loading...</div>
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : 'N/A'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
      {token && (
        <>
          <h2>Set BirthYear</h2>
          <BirthYearForm />
        </>
      )}
      
    </div>
  )
}

export default Authors
