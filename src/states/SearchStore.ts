import { create } from 'zustand';

interface StoreState {
  searchInput: string;
  setSearchInput: (inputValue: string) => void;
  recentInputs: Array<string>;
  setRecentInputs: (inputArray: Array<string>) => void;
}

const useSearchStore = create<StoreState>((set) => ({
  searchInput: '',
  setSearchInput: (inputValue: string) => set({ searchInput: inputValue }),
  recentInputs: JSON.parse(localStorage.getItem('recentInputs') || '[]'),
  setRecentInputs: (inputArray: Array<string>) => {
    localStorage.setItem('recentInputs', JSON.stringify(inputArray));
    set({ recentInputs: inputArray });
  },
}));

export default useSearchStore;
