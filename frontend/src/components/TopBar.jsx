import Logo from '../assets/zamlib-w.png';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { checkInternetConnection } from '../utils/checkConnection';

import useUserStore from '../store/useUserStore';
import useNotificationStore from '../store/notificationStore';
import useConnectionStore from '../store/connectionStore';

import NotificationCenter from './NotificationCenter';

const TopBar = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);
  const prevStatusRef = useRef(null);

  const status = useConnectionStore((state) => state.status);
  const lastConnected = useConnectionStore((state) => state.lastConnected);
 const formatDateTime = (dateObj) => {
    if (!dateObj) return 'Never';
    return new Date(dateObj).toLocaleString();
  };

  function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - new Date(date);

    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);
    const months = Math.floor(days / 30);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 10) return `${days} day${days > 1 ? 's' : ''} ago`;
    return `${months || 1} month${months > 1 ? 's' : ''} ago`;
  }

  const handleLogout = () => {
    setLoading(true);
    addNotification({ type: 'warning', message: 'Logging Out...' });

    setTimeout(() => {
      logout();
      navigate('/guest/dashboard');
      setLoading(false);
    }, 2000);
  };

  const tryConnect = async () => {
    setLoading(true);

    try {
        
        await checkInternetConnection(); // Trigger status check
        const latest = useConnectionStore.getState().lastConnected;
    
        addNotification({
          type: 'info',
          message: `Last connected: ${getRelativeTime(latest)}`,
        });
    } catch (error) {
        addNotification({
          type: 'error',
          message: `Failed to reconnect`,
        });
        
    }finally{  
        setTimeout(() => {  
            setLoading(false);
        }, 2000);
        console.debug(`Raw connection date: ${latest}`);
    }
  };

  // 🔁 useEffect to check every 5 minutes
  useEffect(() => {
    prevStatusRef.current = status;

    const monitorConnection = async () => {
      const previous = prevStatusRef.current;

      await checkInternetConnection(); // Updates Zustand

      const current = useConnectionStore.getState().status;
      const latest = useConnectionStore.getState().lastConnected;

      if (previous !== current) {
        if (current === 'online') {
          addNotification({
            type: 'success',
            message: `Connection restored - ${getRelativeTime(latest)}.`,
          });
        } else if (current === 'offline') {
          addNotification({
            type: 'warning',
            message: `No Internet`,
          });
        }
        console.log('Checking connection...', formatDateTime(latest));
        prevStatusRef.current = current; // Update ref
      }
    };

    // Immediate check
    monitorConnection();

    // 5 min interval
    intervalRef.current = setInterval(monitorConnection, 1200000);

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []); // Empty deps → runs once on mount

  return (
    <div className="topbar-2">
      <NotificationCenter />
      <div className="flex items-center gap-y-2 capitalize">
        <img src={Logo} alt="Zambia digital library" height="44px" />
        <h3>| {user?.role ?? 'Unknown'} Mode</h3>
      </div>
      <div className="buttons flex gap-y-2">
        {loading && <div className="loader"></div>}
        <button 
          onClick={tryConnect} 
          className="btn-y flex items-center capitalize" 
          title="Click to reconnect"
        >
          <div
            className={
              status === 'online' ? 'green' :
              status === 'offline' ? 'red' :
              'yellow'
            }
          />
          {status}
        </button>
        <button onClick={handleLogout} className="btn-x">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
