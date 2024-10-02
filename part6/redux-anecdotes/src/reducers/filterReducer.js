import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name:'filter',
  initialState:'all',
  reducers:{
    filterChange:(state, action ) => action.payload
  }

})
export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer