import { CartItemData } from '../interfaces/cart';
import { client } from './axiosInstance';

// 봉달 목록 조회 API
export const getCartsAPI = async (): Promise<CartItemData[]> => {
  try {
    const res = await client.get('/carts');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else {
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

// 봉달 추가 API
export const postCartsAPI = async (data: any) => {
  try {
    const res = await client.post('/carts', data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else {
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};

// 봉달 옵션 수정 API
export const patchCartsOptionsAPI = async (
  id: number | undefined,
  data: any,
) => {
  try {
    const res = await client.patch(`/carts/${id}/options`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else {
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};
