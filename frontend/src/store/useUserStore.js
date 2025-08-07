import { create } from 'zustand';

const getStoredUser = () => {
  const stored = localStorage.getItem('user'); // Or sessionStorage
  return stored ? JSON.parse(stored) : null;
};

const useUserStore = create((set) => ({
  user: getStoredUser(),
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user)); // Sync storage
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('user'); // Or sessionStorage
    set({ user: null });
  },
}));

export default useUserStore;
