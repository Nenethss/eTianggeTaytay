import React from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import logo from "../assets/logo-taytay.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="" />
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Signup</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
