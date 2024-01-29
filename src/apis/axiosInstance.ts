import axios from 'axios';

const baseURL = 'https://api.petqua.co.kr';

export const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
});
