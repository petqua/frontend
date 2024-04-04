import {
  Address,
  Order,
  PaymentFail,
  PaymentSuccess,
} from '../interfaces/payment';
import { client } from './axiosInstance';

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
// 주문 생성 API
export const postOrdersAPI = async ({
  shippingAddressId,
  shippingRequest,
  orderProductRequests,
  totalAmount,
}: Order) => {
  try {
    const res = await client.post('/orders', {
      shippingAddressId,
      shippingRequest,
      orderProductRequests,
      totalAmount,
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
// 결제 성공 API
export const postOrdersPaymentSuccessAPI = async ({
  paymentType,
  orderId,
  paymentKey,
  amount,
}: PaymentSuccess) => {
  try {
    const res = await client.post(
      '/orders/payment/success',
      {},
      {
        params: {
          paymentType,
          orderId,
          paymentKey,
          amount,
        },
      },
    );
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
// 결제 실패 API
export const postOrdersPaymentFailAPI = async ({
  code,
  message,
  orderId,
}: PaymentFail) => {
  try {
    const res = await client.post(
      '/orders/payment/success',
      {},
      {
        params: {
          code,
          message,
          orderId,
        },
      },
    );
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
