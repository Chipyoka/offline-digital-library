import SideMenu from '../components/SideMenu';
import TopBar from '../components/TopBar';
import {useState} from 'react';

import useUserStore from '../store/useUserStore';

const AdminPanel = () => {
    const user = useUserStore((state) => state.user);
    const [content, setContent] = useState(null);

    return(
        <>
            <TopBar/>
           <div className="container">
                <main className="flex">
                    <div className="h-70">
                        <SideMenu/>
                    </div>
                    <div className="w-70 p-2">
                        <div className="flex items-center justify-between"> 
                            <h4>Admin Panel</h4>
                            <p>Hello {user?.role}</p>

                        </div>
                        <div>
                          
                        </div>

                     
                        <p className="caption my-1">System Management and Monitoring</p>

                        {/* Actual content view */}
                        <div className="content-view">
                            {!content && 
                                <div className="container">
                                    <p>Something went wrong</p>
                                </div>
                            }
                        </div>
                    </div>
                </main>
           </div>
        </>
    )
}

export default AdminPanel;