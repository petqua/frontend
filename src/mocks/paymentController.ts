import { HttpResponse, http } from 'msw';
import { Address } from '../interfaces/payment';

export const mockGetDefaultAddressAPI = http.get(
  '/api/shipping-address/default',
  () => {
    const data = {
      id: 1,
      name: '집1',
      receiver: '펫쿠아',
      phoneNumber: '010-1234-1234',
      zipCode: 120034,
      address: '서울시 중앙로 54길 999번지 99',
      detailAddress: '102호',
      isDefaultAddress: false,
    };
    return HttpResponse.json(data);
  },
);

export const mockPostNewAddressAPI = http.post(
  '/api/shipping-address',
  async ({ request }) => {
    const newPost = await request.json();
    const phoneNumber = (newPost as Address).phoneNumber;
    if (phoneNumber === '') {
      return HttpResponse.error();
    }
    const data = {
      id: 1,
    };
    return HttpResponse.json(data);
  },
);
