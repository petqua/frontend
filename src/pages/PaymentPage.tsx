import { useQuery } from '@tanstack/react-query';
import {
  AddressForm,
  BlueButton,
  PaymentSummary,
  TopNav,
} from '../components/molecules';
import { getDefaultAddressAPI } from '../apis';
import { useEffect, useMemo, useState } from 'react';
import { usePaymentStore } from '../states';
import { CartFishList, DeliveryAddressModal } from '../components/organisms';
import { CustomHr } from '../components/atoms';
import { theme } from '../styles/theme';
import { CartItemDetails } from '../interfaces/payment';
import { getTotalFee } from '../utils/delivery';
import OrderConfirmationModal from '../components/organisms/modals/OrderConfirmation';

const PaymentPage = () => {
  const { address, setAddress } = usePaymentStore();
  const { data: defaultAddressData } = useQuery({
    queryKey: ['defaultAddress'],
    queryFn: getDefaultAddressAPI,
    staleTime: 30 * 1000,
    gcTime: 60 * 1000,
  });

  // const { data: cartData } = useQuery({
  //   queryKey: ['cart'],
  //   queryFn: getCartsAPI,
  //   staleTime: 30 * 1000,
  //   gcTime: 60 * 1000,
  //   enabled: source === 'cart',
  // });

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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  // 지금은 그냥 MOCK_DATA로 테스트, 추후에 source에 따라서 cartData 또는 directData 로 변경
  const totalFee = useMemo(() => getTotalFee(MOCK_DATA), [MOCK_DATA]);

  useEffect(() => {
    if (address !== null) return;
    if (defaultAddressData) {
      setAddress(defaultAddressData);
    }
  }, [defaultAddressData]);

  return (
    <>
      <TopNav backBtn title="주문/결제" />
      {/*<AddressForm setIsModalOpen={setIsModalOpen} />*/}
      {<AddressForm setIsModalOpen={setIsModalOpen} />}
      <CustomHr height="0.8rem" color={theme.color.gray[30]} />
      <CartFishList cartData={MOCK_DATA} />
      <CustomHr height="0.8rem" color={theme.color.gray[30]} />
      <PaymentSummary totalFee={totalFee} />
      <CustomHr height="0.8rem" color={theme.color.gray[30]} />
      <BlueButton
        text="결제하기"
        onClick={() => setIsOrderModalOpen(true)}
        style={{ width: '50%', margin: '15px auto' }}
        isBigText
      />
      {/* 주문 완료 모달 */}
      <OrderConfirmationModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
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
