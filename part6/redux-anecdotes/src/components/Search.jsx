import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Search = () => {
  const dispatch = useDispatch()

  const style ={
    marginBottom:10
  }

  const handleChange = (event) => {
    const searchVal = event.target.value
    dispatch(filterChange(searchVal))
  }

  return (
    <div style={style}>
      <label htmlFor="">filter 
        <input type="text" name='searchVal' onChange={handleChange}/>
      </label>      
    </div>
  )
}

export default Search
