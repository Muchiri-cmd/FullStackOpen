const Filter = ({value,onChange}) => {
    return (
      <div className="search">
         <label> <h3>Search By Name </h3>
            <input className ="searchInput" value={value} onChange={onChange} placeholder="John Doe ..."/>
        </label>
      </div>
    )
}
export default Filter