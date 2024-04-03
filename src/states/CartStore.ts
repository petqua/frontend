import { create } from 'zustand';
import { CartStoreSectionData } from '../interfaces/cart';

interface CartStoreState {
  items: CartStoreSectionData[];
  setItems: (items: CartStoreSectionData[]) => void;
}

export const useCartStore = create<CartStoreState>((set) => ({
  items: [],
  setItems: (items: CartStoreSectionData[]) => set({ items }),
}));
