import React from 'react';
import '../style/sidebar.css';
import logo from "../assets/logo-taytay.png";

const Sidebar = ({ onAccountClick, onLogout }) => {
    return (
        <div className="sidebar">
            <div className='logo'>
            <img src={logo} alt="" />
            </div>
            <button onClick={onAccountClick} className="sidebar-button">
                Account
            </button>
            <button onClick={onLogout} className="sidebar-button">
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
