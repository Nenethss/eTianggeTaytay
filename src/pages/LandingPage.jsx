import React from "react";
import Navbar from "./NavBar"; // Import the Navbar component
import "../style/LandingPage.css";
import background from "../assets/background.jpg";

const LandingPage = () => {

    return (
        <div className="landing-container">
            <Navbar />
            <div className="main-container">
                <div className="sub-container">
                    <div className="sub-container-content">
                        <h1>
                        Enjoy A Vast Amount Of Product! Explore, Shop, and Buy Today.
                        </h1>
                        <button className="explore">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
            <footer className="landing-footer">
                <p>e-Tiangge Portal © 2024. All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default LandingPage;
