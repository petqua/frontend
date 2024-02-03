import axios from 'axios';
// const DEV = import.meta.env;

// const baseURL = DEV ? '/api' : 'https://api.petqua.co.kr';
const baseURL = 'https://api.petqua.co.kr';

export const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
});
