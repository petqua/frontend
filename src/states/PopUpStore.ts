import { create } from 'zustand';

interface StoreState {
  state: string;
  setState: (state: string) => void;
  action: string;
  setAction: (action: string) => void;
  isOpenPopUp: boolean;
  setIsOpenPopUp: (state: boolean) => void;
}

// state 종류 (3가지) : add, filled, needLogin
const usePopUpStore = create<StoreState>((set) => ({
  state: '',
  setState: (state: string) => set({ state }),
  action: '',
  setAction: (action: string) => set({ action }),
  isOpenPopUp: false,
  setIsOpenPopUp: (state: boolean) => set({ isOpenPopUp: state }),
}));

export default usePopUpStore;
