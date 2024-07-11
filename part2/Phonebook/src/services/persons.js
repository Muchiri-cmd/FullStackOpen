import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const addPerson = (newObject) => axios.post(baseUrl,newObject).then(res => res.data)
const getPeople = () => axios.get(baseUrl).then(res => res.data)
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`).then(res => res.data)
const updateRecord = (id,newObject) => axios.put(`${baseUrl}/${id}`,newObject).then(res => res.data)


export default {addPerson,getPeople,deletePerson,updateRecord}