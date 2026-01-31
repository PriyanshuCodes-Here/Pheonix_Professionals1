import axios from "axios";

const API_URL = "http://localhost:5002/api/blogs";

export const getAllBlogs = () => axios.get(API_URL);
export const getBlogById = (id) => axios.get(`${API_URL}/${id}`);
