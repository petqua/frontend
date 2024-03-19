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
}

const usePaymentStore = create<PaymentState>((set) => ({
  address: null,
  setAddress: (inputAddress: Address) => set({ address: inputAddress }),
}));

export default usePaymentStore;
