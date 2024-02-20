import { useQuery } from '@tanstack/react-query';
import { AddressForm, TopNav } from '../components/molecules';
import { getCartsAPI, getDefaultAddressAPI } from '../apis';
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

  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartsAPI,
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
