import { create } from 'zustand';

interface Address {
  id: number;
  name: string;
  receiver: string;
  phoneNumber: string;
  zipCode: number | undefined;
  address: string;
  detailAddress: string;
  isDefaultAddress: boolean;
}

interface PaymentState {
  address: Address | null;
  setAddress: (inputValue: Address) => void;
  shippingRequest: string;
  setShippingRequest: (option: string) => void;
  customShippingRequest: string;
  setCustomShippingRequest: (input: string) => void;
}

const usePaymentStore = create<PaymentState>((set) => ({
  address: null,
  setAddress: (inputAddress: Address) => set({ address: inputAddress }),
  shippingRequest: '배송시 요청사항을 선택해주세요',
  setShippingRequest: (option: string) => set({ shippingRequest: option }),
  customShippingRequest: '',
  setCustomShippingRequest: (input: string) =>
    set({ customShippingRequest: input }),
}));

export default usePaymentStore;
