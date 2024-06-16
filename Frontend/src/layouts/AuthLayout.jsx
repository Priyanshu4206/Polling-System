import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ProtectRoute({ children, authentication }) {
    const token = Cookies.get('accessToken');
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        if (authentication && Boolean(token) !== authentication) {
            navigate("/login");
        }
        else if (!authentication && Boolean(token) !== authentication) {
            navigate("/");
        }
        if (authentication && Boolean(token) !== authentication) {
            navigate("/create-poll");
        }
        setLoader(false);
    }, [token, authentication]);
    return loader ? null : (
        <>
            {children}
        </>
    )
}

export default ProtectRoute
