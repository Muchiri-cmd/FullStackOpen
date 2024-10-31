import axios from "axios";
import { head } from "lodash";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newBlog) => {
  const authorization = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, authorization);
  return response.data;
};

const like = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

const remove = async (id) => {
  const authorization = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, authorization);
  return response.data;
};

const addComment = async(id,comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`,{comment})
  return response.data
}

export default { getAll, create, setToken, like, remove, getById ,addComment};
