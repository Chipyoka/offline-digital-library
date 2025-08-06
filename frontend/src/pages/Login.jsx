import Logo from '../assets/zamlib-w.png';
import {useState} from 'react';



const Login = () => {
    const [userMode, setUserMode] = useState('');
    const [title, setTitle] = useState('Welcome to the');
    const [desc, setDesc] = useState('Continue as');

    const handleRedirect = () => {

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
                { !userMode && 
                    <div className="container">
                        <div className="btn-box">
                          
                            <button className="primary-btn-lg-outline">A Guest</button>
                            <button onClick={()=> setUserMode('student')} className="primary-btn-lg">A Student</button>
                            <hr className="my-2" />
                            <button className="secondary-btn-lg">Admin Login</button>
                        </div>
                    </div>
                }

                { userMode == 'student' &&
                
                    <form action="">

                        <div className="input-group">
                            <label htmlFor="grade">Select Grade</label>
                            <select name="grade">
                                <option value="">Grade 8</option>
                                <option value="">Grade 9</option>
                                <option value="">Grade 10</option>
                                <option value="">Grade 11</option>
                                <option value="">Grade 12</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="student-id">Enter Student Number:</label>
                            <input type="number" name="student-id" />
                        </div>

                        <button className="primary-btn-lg">
                            Enter Library
                        </button>

                        <h4 onClick={() => setUserMode('')} className="hyperlink">Return to home</h4>

                    </form>
                }

            </main>
           </div>
        </div>
    )
}

export default Login;