import SideMenu from '../components/SideMenu';
import TopBar from '../components/TopBar';
import {useState} from 'react';

import useUserStore from '../store/useUserStore';

const Assessment = () => {
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
                            <h4>Assessments Center</h4>

                            {/* Search field (by content name) */}
                              <div className="search-input">
                                <input type="text" name="" id="" placeholder="Search quiz by name..."/>
                                <button className="primary-btn">Search</button>
                            </div>
                        </div>
                        <div>
                          
                        </div>

                        <p className="caption my-1">All Content</p>

                        {/* Actual content view */}
                        <div className="assessment-view">
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

export default Assessment;