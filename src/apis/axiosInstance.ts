import axios from 'axios';

const { DEV } = import.meta.env;

const baseURL = DEV ? '/api' : 'https://bewater-api.com';

export const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
});
