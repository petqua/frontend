import { useQuery } from '@tanstack/react-query';
import { AddressForm, PaymentInfo, TopNav } from '../components/molecules';
import { getCartsAPI, getDefaultAddressAPI } from '../apis';
import { useEffect, useState } from 'react';
import { usePaymentStore } from '../states';
import { CartFishList, DeliveryAddressModal } from '../components/organisms';
import { CustomHr } from '../components/atoms';
import { theme } from '../styles/theme';
import { useParams } from 'react-router-dom';
import { CartItemDetails } from '../interfaces/payment';

const PaymentPage = () => {
  const { source } = useParams();

  const { address, setAddress } = usePaymentStore();
  const { data: defaultAddressData, isLoading } = useQuery({
    queryKey: ['defaultAddress'],
    queryFn: getDefaultAddressAPI,
    staleTime: 30 * 1000,
    gcTime: 60 * 1000,
  });

  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartsAPI,
    staleTime: 30 * 1000,
    gcTime: 60 * 1000,
    enabled: source === 'cart',
  });

  // 추후에는 결제 페이지에서 넘어온 데이터 넣는 것으로 수정
  const MOCK_DATA: CartItemDetails[] = [
    {
      id: 1,
      storeName: '현대올림피아드 아쿠아',
      productId: 1,
      productName: '베타',
      productThumbnailUrl:
        'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
      productPrice: 30000,
      productDiscountRate: 30,
      productDiscountPrice: 21000,
      quantity: 20,
      sex: 'FEMALE',
      deliveryMethod: 'SAFETY',
      deliveryFee: 10000,
      isOnSale: true,
      safeDeliveryFee: 10000,
      commonDeliveryFee: 3000,
      pickUpDeliveryFee: 0,
      maleAdditionalPrice: 1000,
      femaleAdditionalPrice: 1000,
    },
    {
      id: 2,
      storeName: '현대올림피아드 아쿠아',
      productId: 2,
      productName: '알비노 풀레드 아시안 고정구피',
      productThumbnailUrl:
        'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
      productPrice: 30000,
      productDiscountRate: 30,
      productDiscountPrice: 21000,
      quantity: 1,
      sex: 'MALE',
      deliveryMethod: 'COMMON',
      deliveryFee: 3000,
      isOnSale: true,
      safeDeliveryFee: 5000,
      commonDeliveryFee: 3000,
      pickUpDeliveryFee: 0,
      maleAdditionalPrice: 1000,
      femaleAdditionalPrice: 1000,
    },
    {
      id: 3,
      storeName: 'S아쿠아',
      productId: 3,
      productName: '아메리칸 유동구피',
      productThumbnailUrl:
        'https://docs.petqua.co.kr/products/thumbnails/thumbnail1.jpeg',
      productPrice: 30000,
      productDiscountRate: 30,
      productDiscountPrice: 21000,
      quantity: 20,
      sex: 'MALE',
      deliveryMethod: 'PICKUP',
      deliveryFee: 0,
      isOnSale: true,
      safeDeliveryFee: 5000,
      commonDeliveryFee: 3000,
      pickUpDeliveryFee: 0,
      maleAdditionalPrice: 1000,
      femaleAdditionalPrice: 1000,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [paymentType, setPaymentType] = useState('신용/체크카드');

  useEffect(() => {
    if (address !== null) return;
    if (defaultAddressData) {
      setAddress(defaultAddressData);
    }
  }, [defaultAddressData]);

  return (
    <>
      <TopNav backBtn title="주문/결제" />
      {!isLoading && <AddressForm setIsModalOpen={setIsModalOpen} />}
      <CustomHr height="0.8rem" color={theme.color.gray[30]} />
      <CartFishList cartData={source === 'cart' ? cartData : MOCK_DATA} />
      <CustomHr height="0.8rem" color={theme.color.gray[30]} />
      <PaymentInfo paymentType={paymentType} setPaymentType={setPaymentType} />
      {isModalOpen && (
        <DeliveryAddressModal
          title="운송지 추가"
          setIsOpenModal={setIsModalOpen}
        />
      )}
    </>
  );
};

export default PaymentPage;
