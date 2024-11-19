import React from 'react';
import '../style/sidebar.css';
import logo from "../assets/logo-taytay.png";
import cog from "../assets/cog.png";
import account from "../assets/account.png";
import dashboard from "../assets/dashboard.png";
import logout from "../assets/logout.png";

const Sidebar = ({ onAccountClick, onLogout }) => {
    return (
        <div className="sidebar">
            <div className='logo'>
            <img src={logo} alt="" />
            </div>
            <button  className="sidebar-button">
                <div>
                <img src={dashboard} alt="" />
                </div>
                Dashboard
            </button>
            <button onClick={onAccountClick} className="sidebar-button">
                <div>
                <img src={account} alt="" />
                </div>
                Account
            </button>
            <button  className="sidebar-button">
                <div>
                <img src={cog} alt="" />
                </div>
                Setting
            </button>
            <div className='logout'>
            <button onClick={onLogout} className="sidebar-button">
                <div> 
                <img src={logout} alt="" />
                </div>
                Logout
            </button>
            </div>
        </div>
    );
};

export default Sidebar;
