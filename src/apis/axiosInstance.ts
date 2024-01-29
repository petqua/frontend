import axios from 'axios';

const { DEV } = import.meta.env;
// proxy 설정때문에 이렇게 해야함
const baseURL = DEV ? '' : 'https://api.petqua.co.kr';

export const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
});
