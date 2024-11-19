import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import Sidebar from './SideBar';
import '../style/AdminDashboard.css'; 

const AdminDashboard = () => {
    const [selectedContent, setSelectedContent] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login"); // Redirect to login page
    };

    const handleAccountClick = () => {
        setSelectedContent('user-management'); // Set UserManagement as the selected content
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Sidebar onAccountClick={handleAccountClick} onLogout={handleLogout} />

            {/* Content Area */}
            <div className="content-area">
                {selectedContent === 'user-management' ? (
                    <UserManagement /> // Render UserManagement component
                ) : (
                    <div className="default-content">
                        <h2>Welcome to the Admin Dashboard!</h2>
                        <p>Click on "Account" to manage users.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
