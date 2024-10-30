import axios from "axios";
const baseURL = "/api/users";

const allUsers = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const getUserById = async(id) => {
  const response = await axios.get(`${baseURL}/${id}`);
  return response.data
}

export default { allUsers,getUserById }
