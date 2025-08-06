// store/notificationStore.js
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useNotificationStore = create((set) => ({
  notifications: [],

  addNotification: ({ type = 'info', message, duration = 5000 }) => {
    const id = uuidv4();
    const notification = { id, type, message, duration };

    set((state) => ({
      notifications: [...state.notifications, notification],
    }));

    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, duration);
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

export default useNotificationStore;
