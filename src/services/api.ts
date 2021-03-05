import axios from 'axios'

const makeRequest = axios.create({
  baseURL: 'http://localhost:3001',
});

export default makeRequest;