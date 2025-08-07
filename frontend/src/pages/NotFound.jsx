import {useNavigate} from 'react-router-dom';
import Logo from '../assets/zamlib-w.png';
const NotFound = () => {

    const navigate = useNavigate();

    return(
        <div className="un container">
           <div className="un-card">
                <div className="l">
                    <img src={Logo} alt="ZODL"  height="44px"/>
                </div>
                <h1> Page Not Found.</h1>
                <p className=""> Error 404 - The page you're looking for does not exist.</p>
                <p
                    className="hyperlink blue my-2" 
                    onClick={() => navigate('/')}
                >Return to login</p>
           </div>
        </div>
    )
}

export default NotFound