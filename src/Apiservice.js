import axios from 'axios';

const API = axios.create({ baseURL: 'https://schema-ref-server-side.vercel.app'});

export const createUser = (data) => API.post('/users', data);
export const createPost = (data) => API.post('/posts', data);
export const fetchPosts = () => API.get('/posts');