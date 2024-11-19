import React, { useState } from "react";
import axios from "axios";

const AddAdminForm = ({ setMessage, setUsers }) => {
    const [newAdmin, setNewAdmin] = useState({ username: "", email: "", password: "" });

    const handleAddAdmin = async () => {
        if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost/eTianggeTaytay/server/addAdmin.php", newAdmin);
            console.log("Add Admin Response:", response.data);
            if (response.data.success) {
                setMessage("Admin added successfully.");
                setUsers((prev) => [...prev, response.data.admin]); // Add new admin to the table
                setNewAdmin({ username: "", email: "", password: "" }); // Reset form fields
            } else {
                setMessage(response.data.message || "Failed to add admin.");
            }
        } catch (error) {
            console.error("Add Admin Error:", error);
            setMessage("An error occurred while adding the admin.");
        }
    };

    return (
        <div className="add-admin-form">
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
            <button onClick={handleAddAdmin}>Add Admin</button>
        </div>
    );
};

export default AddAdminForm;
