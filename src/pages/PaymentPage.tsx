import { useQuery } from '@tanstack/react-query';
import { AddressForm, TopNav } from '../components/molecules';
import { getDefaultAddressAPI } from '../apis';
import { useEffect, useState } from 'react';
import { usePaymentStore } from '../states';
import { CartFishList, DeliveryAddressModal } from '../components/organisms';
import { CustomHr } from '../components/atoms';
import { theme } from '../styles/theme';

const PaymentPage = () => {
  const { address, setAddress } = usePaymentStore();
  const { data: defaultAddressData, isLoading } = useQuery({
    queryKey: ['defaultAddress'],
    queryFn: getDefaultAddressAPI,
    staleTime: 30 * 1000,
    gcTime: 60 * 1000,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (address !== null) return;
    if (defaultAddressData) {
      setAddress(defaultAddressData);
    }
  }, [defaultAddressData]);

  const cartData = [
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
      isMale: true,
      deliveryMethod: 'SAFETY',
      isOnSale: true,
    },
    {
      id: 1,
      storeName: 'N아쿠아',
      productId: 2,
      productName: '알빠노 썸블루 아메리칸 유동구피',
      productThumbnailUrl:
        'https://docs.petqua.co.kr/products/thumbnails/thumbnail2.jpeg',
      productPrice: 50000,
      productDiscountRate: 0,
      productDiscountPrice: 50000,
      quantity: 1,
      isMale: false,
      deliveryMethod: 'SAFETY',
      isOnSale: false,
    },
  ];

  return (
    <>
      <TopNav backBtn title="주문/결제" />
      {!isLoading && <AddressForm setIsModalOpen={setIsModalOpen} />}
      <CustomHr height="0.8rem" color={theme.color.gray[30]} />
      <CartFishList cartData={cartData} />
      <CustomHr height="0.8rem" color={theme.color.gray[30]} />
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
