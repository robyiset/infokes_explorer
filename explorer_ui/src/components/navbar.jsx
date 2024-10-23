// components/Navbar.jsx
import React from 'react';
import './navbar.css'; // Include your custom CSS for the navbar
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Ensure you have the correct imports

function Navbar({ onBack, onForward, currentDir, onChangeDir }) {
    return (
        <div className="navbar">
            <span onClick={onBack} className="navbar-icon">
                <FaArrowLeft />
            </span>
            <span onClick={onForward} className="navbar-icon">
                <FaArrowRight />
            </span>
            <input
                type="text"
                value={currentDir}
                onChange={(e) => onChangeDir(e.target.value)}
                className="navbar-input"
                placeholder="Directory..."
            />
        </div>
    );
}

export default Navbar;
