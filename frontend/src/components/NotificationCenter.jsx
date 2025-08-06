// components/NotificationCenter.jsx
import useNotificationStore from '../store/notificationStore';

const NotificationCenter = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  return (
    <div className="notification-wrapper">
      {notifications.map((note) => (
        <div
          key={note.id}
          className={`notification ${note.type}`}
        >
          <div className="notification-content">
            <span>{note.message}</span>
            <button onClick={() => removeNotification(note.id)} className="close-btn">
              &times;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
