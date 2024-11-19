import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Usermanagement.css";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(""); // Message to display
    const [newAdmin, setNewAdmin] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility for adding admin
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // State for message modal
    const [selectedUser, setSelectedUser] = useState(null); // To store the selected user for the user details modal
    const [isDeleting, setIsDeleting] = useState(false); // Prevent multiple delete clicks

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost/eTianggeTaytay/server/getUsers.php");
                console.log("API Response:", response.data);

                if (response.data.success) {
                    setUsers(response.data.data);
                } else {
                    console.error("API Error:", response.data.message);
                    setMessage(response.data.message || "Failed to load users.");
                }
            } catch (error) {
                console.error("Fetch error:", error.message);
                setMessage("An error occurred while fetching users.");
            }
        };
        fetchUsers();
    }, []);

    const handleAddAdmin = async () => {
        if (!newAdmin.username || !newAdmin.email || !newAdmin.password || !newAdmin.confirmPassword) {
            setMessage("All fields are required.");
            return;
        }

        if (newAdmin.password !== newAdmin.confirmPassword) {
            setMessage("Password and Confirm Password must match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost/eTianggeTaytay/server/addAdmin.php", newAdmin);
            console.log("Add Admin Response:", response.data);
            if (response.data.success) {
                setMessage("Admin added successfully.");
                setUsers((prev) => [...prev, response.data.admin]); // Add new admin to the table
                setNewAdmin({ username: "", email: "", password: "", confirmPassword: "" }); // Reset form fields
                setIsModalOpen(false); // Close the modal after successful add
            } else {
                setMessage(response.data.message || "Failed to add admin.");
            }
        } catch (error) {
            console.error("Add Admin Error:", error);
            setMessage("An error occurred while adding the admin.");
        }

        // Open the message modal
        setIsMessageModalOpen(true);
        
        // Automatically close the message modal after 3 seconds
        setTimeout(() => {
            setIsMessageModalOpen(false);
        }, 3000);
    };

    // Handler for opening the user details modal
    const handleUserClick = (user) => {
        setSelectedUser(user); // Store the selected user's data
    };

    // Close the user details modal
    const closeUserModal = () => {
        setSelectedUser(null); // Clear the selected user data
    };

    // Confirm and handle user deletion
    const handleDeleteUser = async () => {
        if (!selectedUser) {
            setMessage("No user selected for deletion.");
            return;
        }

        if (isDeleting) return; // Prevent multiple delete clicks


        setIsDeleting(true); // Block further deletions

        try {
            const response = await axios.post(
                'http://localhost/eTianggeTaytay/server/deleteUser.php',
                { userid: selectedUser.userid } // Use selectedUser.userid here
            );
            console.log('Delete Response:', response.data);
            if (response.data.success) {
                setMessage(response.data.message);
                setUsers((prev) => prev.filter(user => user.userid !== selectedUser.userid));
                setSelectedUser(null); // Close the modal after deletion
            } else {
                setMessage(response.data.message || "Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setMessage("An error occurred while deleting the user.");
        } finally {
            setIsDeleting(false); // Enable deletion again
        }
    
        // Open the message modal for deletion feedback
        setIsMessageModalOpen(true);
        setTimeout(() => setIsMessageModalOpen(false), 3000);
    };

    return (
        <div className="user-management-container">
            <h1>User Management</h1>

            {/* Modal for adding a new admin */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Admin</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={newAdmin.username}
                            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newAdmin.email}
                            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={newAdmin.password}
                            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={newAdmin.confirmPassword}
                            onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                        />
                        <div className="buttons">
                            <button className="add-admin" onClick={handleAddAdmin}>Add</button>
                            <button className="cancel-admin" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Message Modal */}
            {isMessageModalOpen && (
                <div className="message-modal">
                    <div className="message-modal-content">
                        <p>{message}</p>
                        <button onClick={() => setIsMessageModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Table of users */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.userid} onClick={() => handleUserClick(user)}>
                                <td>{user.userid}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="button-container">
                <button className="add-button" onClick={() => setIsModalOpen(true)}>Add Admin</button>
            </div>

            {/* User Details Modal */}
            {selectedUser && (
                <div className="modal">
                    <div className="modal-content user-details">
                        <h2>User Details</h2>
                        <p><strong>Username:</strong> {selectedUser.username}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Role:</strong> {selectedUser.role}</p>
                        <div className="user-detail-button">
                            <button onClick={closeUserModal} className="close-button">Close</button>
                            <button onClick={handleDeleteUser} className="delete-button">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
