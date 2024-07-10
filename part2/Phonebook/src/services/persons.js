import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const addPerson = (newObject) => {
    return axios.post(baseUrl,newObject).then(res => res.data)
}
const getPeople = () => {
    return axios.get(baseUrl).then(res => res.data)
}
const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}
const updateRecord = (id,newObject) => {
    return axios.put(`${baseUrl}/${id}`,newObject).then(res => res.data)
}

export default {addPerson,getPeople,deletePerson,updateRecord}