import {useNavigate} from 'react-router-dom';
import Logo from '../assets/zamlib-w.png';
const Unauthorised = () => {

    const navigate = useNavigate();

    return(
        <div className="un container">
           <div className="un-card">
                <div className="l">
                    <img src={Logo} alt="ZODL"  height="44px"/>
                </div>
                <h1> Not Authorised.</h1>
                <p className="">You have no permission to access this part of the system.</p>
                <p
                    className="hyperlink blue my-2" 
                    onClick={() => navigate('/')}
                >Return to login</p>
           </div>
        </div>
    )
}

export default Unauthorised