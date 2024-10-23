// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { FaHome , FaFolder, FaFolderOpen } from 'react-icons/fa';
import './sidebar.css';
import { fetchFolders } from '../models/apiRequest'; // Import the fetchFolders function

function Sidebar({ setSelectedDir }) {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subfolders, setSubfolders] = useState({});
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        fetchFolders('', setLoading, setFolders, setSubfolders);
    }, []);

    const openFolder = (directory, name) => {
        const path = `${directory}\\${name}`;
        setSelectedDir(path);
    };

    const toggleSubfolder = (directory, name) => {
        const path = `${directory}\\${name}`;
        if (!subfolders[path]) {
            fetchFolders(path, setLoading, setFolders, setSubfolders); // Fetch subfolders if not loaded
        }
        setExpanded(prevState => ({
            ...prevState,
            [path]: !prevState[path], // Toggle expanded state
        }));
    };

    const handleHomeClick = () => {
        setSelectedDir(''); // Set the selected directory to empty string
    };

    const renderFolders = (folders, parentDirectory = '') => {
        return folders.map((folder, index) => {
            const fullPath = `${parentDirectory}\\${folder.name}`;
            const isExpanded = expanded[fullPath];
    
            return (
                <li key={index} className={parentDirectory ? "subfolder-item" : "folder-item"}>
                    <div className="folder-header">
                        <span 
                            className={`toggle-icon ${isExpanded ? 'expanded' : ''}`} 
                            onClick={() => toggleSubfolder(parentDirectory, folder.name)}
                        >
                            {isExpanded ? <FaFolderOpen /> : <FaFolder />}
                        </span>
                        <span onClick={() => openFolder(parentDirectory, folder.name)}>
                            {folder.name}
                        </span>
                    </div>
                    {isExpanded && (
                        <ul className="subfolder-list">
                            {subfolders[fullPath] ? (
                                renderFolders(subfolders[fullPath], fullPath)
                            ) : (
                                <li className="subfolder-item">Loading...</li>
                            )}
                        </ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="sidebar">
            <div className="home-icon" onClick={handleHomeClick} title="Home">
                <FaHome size={24} /> {/* Home icon */}
                <span style={{ marginLeft: '8px' }}>Home</span> {/* Home text */}
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="folder-list">
                    {renderFolders(folders)}
                </ul>
            )}
        </div>
    );
}

export default Sidebar;
