import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useUserManagement from '../../hooks/useUserManagement.js';
const Login = () => {
    const { loginUser } = useUserManagement();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(loginData);
            toast.success("Login Successfull !!");
            setTimeout(() => {
                navigate("/");
            }, 4000)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <>
            <ToastContainer />
            <div className='auth-container'>
                <div className='form-container'>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin} className='login-form'>
                        <input type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="Email..." />
                        <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password..." />
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login

