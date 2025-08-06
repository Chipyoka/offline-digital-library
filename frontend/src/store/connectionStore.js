// store/connectionStore.js
import { create } from 'zustand';

const useConnectionStore = create((set) => ({
  status: 'online', // 'online' | 'offline' | 'connecting'
  lastConnected: new Date(), // Default to app load time

  setStatus: (status) => {
    set((state) => {
      if (status === 'online') {
        return {
          status,
          lastConnected: new Date(), // Update timestamp
        };
      }
      return { status };
    });
  },
}));

export default useConnectionStore;
