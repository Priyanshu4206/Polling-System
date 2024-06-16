import React from 'react'
import { NavLink, Link } from "react-router-dom"
import LogoutBtn from "../LogoutBtn.jsx";
import { useAuth } from '../../context/AuthContext.jsx';
import "./styles.css";
const Header = () => {
    const { isAuthenticated } = useAuth();
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !isAuthenticated
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !isAuthenticated,
        },
        {
            name: "All Polls",
            slug: "/all-polls",
            active: isAuthenticated,
        },
        {
            name: "Create Polls",
            slug: "/create-poll",
            active: isAuthenticated
        },
        {
            name: "User Profile",
            slug: "/user-profile",
            active: isAuthenticated
        },
    ]

    return (
        <header className="header">
            <nav className="nav">
                <div className="logo">
                    <Link to="/">Polling App</Link>
                </div>
                <ul className="nav-list">
                    {navItems.map((navItem, index) => navItem.active && (
                        <li key={index} className="nav-item">
                            <NavLink to={navItem.slug} className={({ isActive }) => isActive ? 'active-navlink' : 'navlink'}>
                                {navItem.name}
                            </NavLink>
                        </li>
                    ))}
                    {isAuthenticated && (
                        <li className="nav-item"><LogoutBtn /></li>
                    )}
                </ul>
            </nav>
        </header>
    )
};

export default Header