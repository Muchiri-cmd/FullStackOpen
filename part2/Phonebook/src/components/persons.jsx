import Person from "./person"
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
export default Persons
  