import React, { useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import useUserManagement from '../hooks/useUserManagement';

const LogoutBtn = () => {
    const { logoutUser } = useUserManagement();
    const navigate = useNavigate();
    const logoutHandler = useCallback(async () => {
        try {
            await logoutUser();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    })
    return (
        <button onClick={logoutHandler} className='logout-btn'>
            Logout
        </button>
    )
}

export default LogoutBtn