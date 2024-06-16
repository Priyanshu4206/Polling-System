import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import useUserManagement from '../../hooks/useUserManagement.js';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { user, updateRole } = useAuth();
    const { getUser, updateUser, deleteUser } = useUserManagement();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: '',
        role: '',
        newPassword: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const fetchedUser = await getUser(user.userId);
                setUserData({
                    name: fetchedUser.name,
                    email: fetchedUser.email,
                    phone: fetchedUser.phone || '',
                    role: fetchedUser.role || '',
                    newPassword: '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [user.userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async () => {
        try {
            if (userData.newPassword === '') {
                delete userData.newPassword;
            }

            await updateUser(userData);
            setEditing(false);
            toast.success("Updated  Successfully !!");
            updateRole(userData.role);
        } catch (error) {
            console.error('Error updating user profile:', error);
            toast.error(error);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Really want to Delete Account ?')) {
            try {
                await deleteUser();
                toast.success("Deleted Successfully !!");
                setTimeout(() => {
                    navigate('/', { replace: true });
                    window.location.reload();
                }, 4000);
            } catch (error) {
                console.log('Error deleting account:', error.response?.data?.message);
                toast.error("Could not Delete !!");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="auth-container user-profile-container">
                <div className="form-container">
                    <h2>User Profile</h2>
                    <div className='input-container'>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className='input-container'>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className='input-container'>
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className='input-container'>
                        <label>Role:</label>
                        <select name="role" value={userData.role} onChange={handleChange} disabled={!editing} defaultValue={userData.role}>
                            <option value="" disabled hidden>
                                Select a role
                            </option>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Institute">Institute</option>
                        </select>
                    </div>
                    <div className='input-container'>
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={userData.newPassword}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>
                    <div className="fluid-container">
                        <button onClick={() => setEditing(true)}>Edit Profile</button>
                        {editing && (
                            <button onClick={handleUpdateProfile}>Update Profile</button>
                        )}
                        <button onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
