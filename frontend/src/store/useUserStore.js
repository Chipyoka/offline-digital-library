
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null, // { name, role, token, etc. }
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
