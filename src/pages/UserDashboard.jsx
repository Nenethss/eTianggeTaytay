import React from 'react';

const UserDashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/"; // Redirect to login page
    };

    return (
        <div>
            <h1>Store Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Add other user features here */}
        </div>
    );
};

export default UserDashboard;
