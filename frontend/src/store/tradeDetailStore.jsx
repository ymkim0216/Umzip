import { create } from 'zustand';

const useTradeDetailsStore = create((set) => ({
  trades: [],
  scrollPosition: 0,
  setTrades: (newTrades) => set({ trades: newTrades }),
  setScrollPosition: (position) => set({ scrollPosition: position }),
}));

export default useTradeDetailsStore;