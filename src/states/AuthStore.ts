import { create } from 'zustand';

interface StoreState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const useAuthStore = create<StoreState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  setAccessToken: (token: string | null) => {
    if (token) {
      localStorage.setItem('accessToken', token);
      set({ accessToken: token });
    } else {
      localStorage.removeItem('accessToken');
      set({ accessToken: null });
    }
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ accessToken: null });
  },
}));

export default useAuthStore;
