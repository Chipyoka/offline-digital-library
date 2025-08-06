import SideMenu from '../components/SideMenu';
import TopBar from '../components/TopBar';
import {useState} from 'react';

import useUserStore from '../store/useUserStore';

const Dashboard = () => {
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
                            <h4>Digital Library</h4>

                            {/* Search field (by content name) */}
                              <div className="search-input">
                                <input type="text" name="" id="" placeholder="Search content by name..."/>
                                <button className="primary-btn">Search</button>
                            </div>
                        </div>
                        <div>
                          
                        </div>

                        {/* Summary */}
                        <div className="summary">
                            <div className="d-card">
                                <h4>0000</h4>
                                <p>Books</p>
                            </div>
                            <div className="d-card">
                                <h4>0000</h4>
                                <p>Videos</p>
                            </div>
                            <div className="d-card">
                                <h4>0000</h4>
                                <p>Quizes</p>
                            </div>
                            <div className="d-card">
                                <h4>0000</h4>
                                <p>Total</p>
                            </div>
                        </div>
                        <p className="caption my-1">All Content</p>

                        {/* Actual content view */}
                        <div className="content-view">
                            {!content && 
                                <div className="container">
                                    <p>No content available</p>
                                </div>
                            }
                        </div>
                    </div>
                </main>
           </div>
        </>
    )
}

export default Dashboard;