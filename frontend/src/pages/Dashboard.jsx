import SideMenu from '../components/SideMenu';
import TopBar from '../components/TopBar';

import useUserStore from '../store/useUserStore';

const Dashboard = () => {
    const user = useUserStore((state) => state.user);

    return(
        <>
            <TopBar/>
           <div className="container">
                <main className="flex">
                    <div className="h-70">
                        <SideMenu/>
                    </div>
                    <div>
                        <div className="p-2"> Dashboard [{user?.role ?? 'Unknown'}]</div>
                    </div>
                </main>
           </div>
        </>
    )
}

export default Dashboard;