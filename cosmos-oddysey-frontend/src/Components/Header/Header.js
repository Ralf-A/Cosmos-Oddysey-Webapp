import "./Header.css";
import { NavLink } from "react-router-dom";
import Home from '../../Assets/Home.svg';

// A basic header component that contains a home button 
function Header() {
    return (
        <div className="header">
            <NavLink className="home-button" to="/">
                <div className="home-icon-text">
                    <img className="home-icon" src={Home} alt="Home" />
                </div>
            </NavLink>
        </div>
    );
}

export default Header;
