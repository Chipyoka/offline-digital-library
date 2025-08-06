// utils/checkConnection.js
import useConnectionStore from '../store/connectionStore';

export const checkInternetConnection = async () => {
  const setStatus = useConnectionStore.getState().setStatus;

  setStatus('connecting');

  try {
    await fetch('https://clients3.google.com/generate_204', {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
    });

    setTimeout(() => {  
        setStatus('online');
    }, 1000);

  } catch (error) {
    setTimeout(() => {  
        setStatus('offline');
    }, 3000);
  }
};
