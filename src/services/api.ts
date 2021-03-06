import axios from 'axios'

const makeRequest = axios.create({
  baseURL: 'http://localhost:3000',
});

export default makeRequest;