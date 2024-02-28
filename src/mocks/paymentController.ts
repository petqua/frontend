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

export const mockGetCartsAPI = http.get('/api/carts', () => {
  const data = [
    {
      id: 1,
      storeName: 'S아쿠아',
      productId: 1,
      productName: '알비노 풀레드 아시안 고정구피',
      productThumbnailUrl:
        'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
      productPrice: 30000,
      productDiscountRate: 30,
      productDiscountPrice: 21000,
      quantity: 1,
      sex: 'MALE',
      deliveryMethod: 'SAFETY',
      deliveryFee: 3000,
      isOnSale: true,
      safeDeliveryFee: 5000,
      commonDeliveryFee: 3000,
      pickUpDeliveryFee: 0,
      maleAdditionalPrice: 1000,
      femaleAdditionalPrice: 1000,
    },
  ];
  return HttpResponse.json(data);
});
