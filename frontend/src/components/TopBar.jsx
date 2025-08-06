import Logo from '../assets/zamlib-w.png';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';


import useUserStore from '../store/useUserStore';
import useNotificationStore from '../store/notificationStore';

import NotificationCenter from './NotificationCenter'
const TopBar = () => {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    const addNotification = useNotificationStore((state) => state.addNotification);

    const [loading, setLoading] = useState(false);

    const handleLogout = () =>{
        setLoading(true);
        addNotification({ type: 'warning', message: 'Logging Out...' })

         setTimeout(() => {    
                const path = `/guest/dashboard`;
                navigate(path);

                useUserStore.getState().logout();
                setLoading(false);
            }, 2000);
    }

    return (
        <div className="topbar-2">
            <NotificationCenter/>
            <div className="flex items-center gap-y-2 capitalize">
                <img src={Logo} alt="Zambia digitial library" height="44px"/>
                <h3>| {user?.role ?? 'Unknown'} Mode</h3>
               
            </div>
            <div className="buttons flex gap-y-2">
                 {loading && <div className="loader"></div>}
                <button className="btn-y flex items-center"><div></div> You're Offline</button>
                <button
                    onClick={handleLogout}
                    className="btn-x"> Logout</button>

                 <button
                    onClick={() =>
                        addNotification({ type: 'warning', message: 'Logging Out...' })
                    }
                    >
                    Save
                </button>
               
            </div>
        </div>
    )
}

export default TopBar;