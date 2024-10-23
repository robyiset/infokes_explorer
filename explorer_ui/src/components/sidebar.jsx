import React, { useState, useEffect } from 'react';
import './sidebar.css'; // Import your own CSS for styling

// Define the Sidebar component
function Sidebar() {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subfolders, setSubfolders] = useState({}); // Store subfolders for each folder
    const [expanded, setExpanded] = useState({}); // Store the expanded state of folders

    // Function to fetch folder tree data from the API
    const fetchFolders = async (dir = '') => {
        try {
            // Encode the directory for URL
            const encodedDir = encodeURIComponent(dir);
            const response = await fetch(`http://localhost:5002/api/directories/folder_tree?dir=${encodedDir}`);
            const result = await response.json();
            
            if (result.status) {
                if (dir === '') {
                    setFolders(result.data); // Set root folders on initial load
                } else {
                    setSubfolders(prevState => ({
                        ...prevState,
                        [dir]: result.data, // Store subfolders under the full path key
                    }));
                }
            } else {
                console.error('Failed to fetch folder tree:', result.message);
            }
        } catch (error) {
            console.error('Error fetching folder tree:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    // useEffect to call the API when the component mounts
    useEffect(() => {
        fetchFolders(); // Fetch root folders on mount
    }, []);

    // Function to handle folder click and fetch subfolders
    const handleFolderClick = (directory, name) => {
        const path = `${directory}\\${name}`;
        if (!subfolders[path]) { // Check if subfolder is already loaded
            fetchFolders(path); // Fetch subfolders if not loaded
        }
        setExpanded(prevState => ({
            ...prevState,
            [path]: !prevState[path], // Toggle expanded state
        }));
    };

    // Recursive function to render folders and their subfolders
    const renderFolders = (folders, parentDirectory = '') => {
        return folders.map((folder, index) => {
            const fullPath = `${parentDirectory}\\${folder.name}`;
            return (
                <li key={index} className="folder-item">
                    <div
                        className="folder-header"
                        onClick={() => handleFolderClick(parentDirectory, folder.name)}
                    >
                        <span className={`toggle-icon ${expanded[fullPath] ? 'expanded' : ''}`}>
                            &#9660;
                        </span>
                        <span>{folder.name}</span>
                    </div>
                    {expanded[fullPath] && (
                        <ul className="subfolder-list">
                            {subfolders[fullPath] ? (
                                renderFolders(subfolders[fullPath], fullPath) // Recursively render subfolders
                            ) : (
                                <li>Loading...</li>
                            )}
                        </ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="sidebar">
            <h1 className="title">Folder Structure</h1>

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
