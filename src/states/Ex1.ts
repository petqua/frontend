import { create } from 'zustand';

interface StoreState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((prevState: any) => ({ count: prevState.count + 1 })),
  decrement: () => set((prevState: any) => ({ count: prevState.count - 1 })),
}));

export default useStore;
