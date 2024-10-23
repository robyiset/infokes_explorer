// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import './sidebar.css';

function Sidebar({ setSelectedDir }) {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subfolders, setSubfolders] = useState({});
    const [expanded, setExpanded] = useState({});

    const fetchFolders = async (dir = '') => {
        try {
            const encodedDir = encodeURIComponent(dir);
            const response = await fetch(`http://localhost:5002/api/directories/folder_tree?dir=${encodedDir}`);
            const result = await response.json();
            
            if (result.status) {
                if (dir === '') {
                    setFolders(result.data);
                } else {
                    setSubfolders(prevState => ({
                        ...prevState,
                        [dir]: result.data,
                    }));
                }
            } else {
                console.error('Failed to fetch folder tree:', result.message);
            }
        } catch (error) {
            console.error('Error fetching folder tree:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const openFolder = (directory, name) => {
        const path = `${directory}\\${name}`;
        // Set the selected directory to the main body when clicking the folder name
        setSelectedDir(path);
    };

    const toggleSubfolder = (directory, name) => {
        const path = `${directory}\\${name}`;
        if (!subfolders[path]) {
            fetchFolders(path); // Fetch subfolders if not loaded
        }
        setExpanded(prevState => ({
            ...prevState,
            [path]: !prevState[path], // Toggle expanded state
        }));
    };

    const renderFolders = (folders, parentDirectory = '') => {
        return folders.map((folder, index) => {
            const fullPath = `${parentDirectory}\\${folder.name}`;
            const isExpanded = expanded[fullPath];
    
            return (
                <li key={index} className={parentDirectory ? "subfolder-item" : "folder-item"}>
                    <div className="folder-header">
                        {/* Toggle icon for opening/closing subfolders */}
                        <span 
                            className={`toggle-icon ${isExpanded ? 'expanded' : ''}`} 
                            onClick={() => toggleSubfolder(parentDirectory, folder.name)}
                        >
                            {isExpanded ? <FaFolderOpen /> : <FaFolder />} {/* Folder open/closed icons */}
                        </span>
                        {/* Folder name that triggers reading the directory */}
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
