import { create } from 'zustand';

interface Address {
  id: number;
  name: string;
  receiver: string;
  phoneNumber: string;
  zipCode: number;
  address: string;
  detailAddress: string;
  isDefaultAddress: boolean;
}

interface StoreState {
  address: Address | null;
  setAddress: (inputValue: Address) => void;
}

const usePaymentStore = create<StoreState>((set) => ({
  address: null,
  setAddress: (inputAddress: Address) => set({ address: inputAddress }),
}));

export default usePaymentStore;
