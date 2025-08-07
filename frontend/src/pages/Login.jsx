import Logo from '../assets/zamlib-w.png';
import {useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';

import useUserStore from '../store/useUserStore';

import axios from 'axios';

// get backend API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Login = () => {
    const [userMode, setUserMode] = useState('guest');
    const [title, setTitle] = useState('Welcome to the');
    const [desc, setDesc] = useState('Continue as');

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [grade, setGrade] = useState('');
    const [studentId, setStudentId] = useState('');

    const navigate = useNavigate();

    const handleAdminLogin = async () => {
    setLoading(true);

    if (!email || !password) {
        console.error("Email and password are required for admin login.");
        return;
    }

    try {
        const response = await axios.post(
        `${API_URL}/login/admin/`,
        { email, password },
        {
            withCredentials: true, // Crucial for session-based auth
            headers: {
            'Content-Type': 'application/json',
            },
        }
        );

        const data = response.data;

        if (data.user) {
        const user = {
            ...data.user,
            role: 'admin',
        };

        // Save to Zustand and persist to localStorage/sessionStorage
        useUserStore.getState().setUser(user);
        localStorage.setItem('user', JSON.stringify(user)); // Or sessionStorage

        console.log("User logged in:", user);

        const path = `/${userMode}/dashboard`;
        navigate(path);
        } else {
        console.error('Login failed:', data.error || data);
        }

    } catch (error) {
        console.error("Error during admin login:", error);
    } finally {
        setLoading(false);
    }
    };


    // Handle student login
    // This function will be called when the user clicks the "Enter Library" button
    const handleStudentLogin = async() => {
        setLoading(true);

        if (!grade || !studentId) {
            console.error("Grade and Student ID are required for student login.");
            return;
        }

        try {
            const response = await axios.post(
            `${API_URL}/login/student/`,
            { grade, student_id: studentId },
            {
                withCredentials: true, // Crucial for session-based auth
                headers: {
                'Content-Type': 'application/json',
                },
            }
            );

            const data = response.data;

            if (data.user) {
            const user = {
                ...data.user,
                role: 'student',
            };

            // Save to Zustand and persist to localStorage/sessionStorage
            useUserStore.getState().setUser(user);
            localStorage.setItem('user', JSON.stringify(user)); // Or sessionStorage

            console.log("User logged in:", user);

            const path = `/${userMode}/dashboard`;
            navigate(path);
            } else {
            console.error('Login failed:', data.error || data);
            }

        } catch (error) {
            console.error("Error during student login:", error);
        } finally {
            setLoading(false);
        }
    }




    const handleRedirect = (e) => {
        e.preventDefault();
        if(userMode == 'student'){
            
            console.log ("Student login detected");
            setTimeout(() => {    
                handleStudentLogin();
            }, 2000);

        }else if(userMode == 'admin'){
            console.log ("Admin login detected");
            setTimeout(() => {    
                handleAdminLogin();
            }, 2000);
        }else{
            console.log ("Guest mode initiated");
            
            setTimeout(() => {    
                const path = `/guest/dashboard`;
                navigate(path);
            }, 2000);
        }

      

        console.log("User:", user);
    }
 
    const handleReset = () => {
        setUserMode('guest'); 
        setTitle('Welcome to the'); 
        setDesc('Continue as');
    }
    return(
        <div className="login-box">
            <div className="topbar container">
                <img src={Logo} alt="Zambia digitial library" height="48px"/>
            </div>
           <div className="container">
             <main>
                <div className="text-center my-2">
                    <h4>{title}</h4>
                    <h1>Zambian Offline Digital Library</h1>
                    <p>{desc}</p>

                </div>
                { userMode=='guest' && 
                    <div className="container">
                        <div className="btn-box">
                          
                            <button onClick={handleRedirect}  className="primary-btn-lg-outline">A Guest</button>
                            <button 
                                onClick={()=> {
                                    setUserMode('student'); 
                                    setTitle('Student Login'); 
                                    setDesc('Enter your login details to access the library');
                                }} 
                                className="primary-btn-lg">A Student</button>
                            <hr className="my-2" />
                            <button 
                                onClick={()=> {
                                    setUserMode('admin'); 
                                    setTitle('Admin Login'); 
                                    setDesc('Enter your login details to access the library admin management');
                                }} 
                                className="secondary-btn-lg">Administrator</button>
                        </div>
                    </div>
                }

                { userMode == 'student' &&
                
                    <form action="">

                        <div className="input-group">
                            <label htmlFor="grade">Select Grade</label>
                            <select 
                             name="grade"
                             value={grade}
                             onChange={(e) => setGrade(e.target.value)}
                            >
                                <option value="grade-8">Grade 8</option>
                                <option value="grade-9">Grade 9</option>
                                <option value="grade-10">Grade 10</option>
                                <option value="grade-11">Grade 11</option>
                                <option value="grade-12">Grade 12</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="student-id">Enter Student Number:</label>
                            <input type="number" 
                            name="student-id" 
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            />
                        </div>

                      
                            <button onClick={handleRedirect} className="primary-btn-lg">
                                Enter Library
                            </button>
                        

                        <h4 onClick={handleReset} className="hyperlink">Return to home</h4>

                    </form>
                }

                {/* Login as admin */}
                { userMode == 'admin' &&
                
                    <form action="">

                  

                        <div className="input-group">
                            <label htmlFor="email">Enter email:</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                name="email" 
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="student-id">Enter password:</label>
                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                name="password" 
                            />
                        </div>

                            <button 
                                type="button"
                                onClick={handleRedirect} 
                                className="primary-btn-lg">
                                Login as admin
                            </button>

                        <h4 onClick={handleReset} className="hyperlink">Return to home</h4>

                    </form>
                }

            </main>
           </div>
        </div>
    )
}

export default Login;