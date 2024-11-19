import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/login.css";
import logo from "../assets/logo.png";
import circle from "../assets/Ellipse.png";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (failedAttempts >= 3) {
            setMessage("Too many failed attempts. Please try again later.");
            return;
        }

        try {
            const response = await axios.post("http://localhost/eTianggeTaytay/server/login.php", {
                username,
                password,
            });

            console.log("Backend response:", response.data);  // Log for debugging

            if (response.data.success) {
                const { role } = response.data.data;  // Adjusted to use `response.data.data`

                // Save user details to localStorage
                localStorage.setItem("user", JSON.stringify(response.data.data));

                // Navigate based on role
                navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
            } else {
                setMessage(response.data.message || "Invalid credentials.");
                setFailedAttempts((prev) => prev + 1);
            }
        } catch (error) {
            console.error("Login error:", error);  // Log for debugging
            setMessage("An error occurred. Please try again.");
        }
    };

    const handlePasswordToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="parent-container">
            <div className="info-container" style={{ padding: "20px" }}>
                <div className="box"></div>
            </div>
            <div className="login-container" style={{ padding: "20px" }}>
                <div className="hero">
                    <img className="login-logo" src={logo} alt="Logo" />
                    <img className="circle" src={circle} alt="Circle" />
                </div>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <div className="show-hide-login">
                        <label className="label" style={{ fontSize: "10px" }}>
                            <input
                                type="checkbox"
                                checked={passwordVisible}
                                onChange={handlePasswordToggle}
                                style={{ width: "20px" }}
                            />
                            Show Password
                        </label>
                        <button type="submit">Login</button>
                    </div>
                </form>
                {message && <p className="message" style={{ color: "red" }}>{message}</p>}
                <div className="TCPP">
                    <a style={{ paddingRight: "30px" }} href="#">
                        Terms and Condition
                    </a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
