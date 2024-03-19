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

interface PaymentStoreState {
  address: Address | null;
  setAddress: (inputValue: Address) => void;
}

export const usePaymentStore = create<PaymentStoreState>((set) => ({
  address: null,
  setAddress: (inputAddress: Address) => set({ address: inputAddress }),
}));
