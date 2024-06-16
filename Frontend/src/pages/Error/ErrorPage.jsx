import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 4000)
    })
    return (
        <div>
            <h1>
                Invalid Request
            </h1>
            <h3>
                Redirecting to Home Page
            </h3>
        </div>
    )
}

export default ErrorPage