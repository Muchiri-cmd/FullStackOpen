const Person = ({name,number,id,deleteRecord}) => {
    return (
      <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button className="delete-btn" onClick={() => deleteRecord(id)}>Delete</button></td>
      </tr>
    )
}

export default Person