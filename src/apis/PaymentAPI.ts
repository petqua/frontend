import { Address } from '../interfaces/payment';
import { client } from './axiosInstance';
// 기본 배송지 조회 API
export const getDefaultAddressAPI = async () => {
  try {
    const res = await client.get('/shipping-address/default');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};
// 배송지 생성 API
export const postNewAddressAPI = async ({
  name,
  receiver,
  phoneNumber,
  zipCode,
  address,
  detailAddress,
  isDefaultAddress,
}: Address) => {
  try {
    const res = await client.post('/shipping-address', {
      name,
      receiver,
      phoneNumber,
      zipCode,
      address,
      detailAddress,
      isDefaultAddress,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};
// 봉달 목록 조회 API
export const getCartsAPI = async () => {
  try {
    const res = await client.get('/carts');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // 서버 응답이 있는 경우 (오류 상태 코드 처리)
      console.error('Server Error:', error.response.data);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      console.error('Error creating question:', error.message);
    }
    throw error;
  }
};
