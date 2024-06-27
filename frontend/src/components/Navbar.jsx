// src/components/Navbar.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../UserContext';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">Company Portal</div>
            <div className="profile-menu">
                <div className="profile-icon">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
