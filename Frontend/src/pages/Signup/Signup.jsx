import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserManagement from '../../hooks/useUserManagement.js';

const Signup = () => {
    const { createUser } = useUserManagement();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        phone: '',
        name: '',
        role: '',
    });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setSignupData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        try {
            await createUser(signupData);
            toast.success('Signup Successful!');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="auth-container">
                <div className="form-container">
                    <h1>Signup</h1>
                    <form onSubmit={handleSignup} className="signup-form">
                        <input
                            type="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleChange}
                            placeholder="Email..."
                            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                            title="Please enter a valid email address"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={signupData.password}
                            onChange={handleChange}
                            placeholder="Password..."
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={signupData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number..."
                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            value={signupData.name}
                            onChange={handleChange}
                            placeholder="Name..."
                            required
                        />
                        <select name="role" value={signupData.role} onChange={handleChange} required>
                            <option value="" disabled hidden>
                                Select a role
                            </option>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Institute">Institute</option>
                        </select>
                        <button type="submit">Signup</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
