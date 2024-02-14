import axios from 'axios';
import { useAuthStore } from '../states';
import { getAccessTokenAPI } from '.';
//const DEV = import.meta.env;

//const baseURL = DEV ? '/api' : 'https://api.petqua.co.kr';
const baseURL = 'https://api.petqua.co.kr';

export const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { setAccessToken, logout } = useAuthStore();
    const customStatusCode = error.response.data.code;
    switch (customStatusCode) {
      case 'A01': {
        const res = await getAccessTokenAPI();
        const newAccessToken = res.headers['authorization'];
        setAccessToken(newAccessToken);
        console.error('로그인 유지 API 적용', customStatusCode);
        break;
      }
      case 'A02':
      case 'A10':
      case 'A11':
      case 'A12':
      case 'A13':
      case 'A20':
      case 'A30':
        logout();
        window.location.href = '/login';
        console.error('소셜 로그인 유도', customStatusCode);
        break;
      case 'P10':
        console.error('유효하지 않은 검색어', customStatusCode);
        break;
      default:
        console.error('알 수 없는 상태 코드: ', customStatusCode);
    }
    return Promise.reject(error);
  },
);
