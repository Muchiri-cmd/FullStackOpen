import axios from "axios";

export const fetchAnecdotes = () => 
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)
