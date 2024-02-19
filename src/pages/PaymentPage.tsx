import { useQuery } from '@tanstack/react-query';
import { AddressForm, TopNav } from '../components/molecules';
import { getDefaultAddressAPI } from '../apis';
import { useEffect, useState } from 'react';
import { usePaymentStore } from '../states';
import { DeliveryAddressModal } from '../components/organisms';

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

  return (
    <>
      <TopNav backBtn title="주문/결제" />
      {!isLoading && <AddressForm setIsModalOpen={setIsModalOpen} />}
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
