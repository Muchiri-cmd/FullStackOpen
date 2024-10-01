const filterReducer = ( state = 'all' , action ) => {
  switch (action.type){
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const filterChange = searchVal => {
  return {
    type:'SET_FILTER',
    payload:searchVal
  }
}

export default filterReducer