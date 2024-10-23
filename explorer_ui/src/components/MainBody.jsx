// components/MainBody.jsx
import React, { useState, useEffect } from 'react';
import './mainbody.css'; // Include your custom CSS
import FileIcon from '../models/FileIcon'; // Import the FileIcon component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function MainBody({ selectedDir }) {
    const [directoryContent, setDirectoryContent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch directory content whenever selectedDir changes
        if (selectedDir !== undefined && selectedDir !== null) {
            fetchDirectoryContent(selectedDir);
        }
    }, [selectedDir]); // Depend on selectedDir

    const fetchDirectoryContent = async (dir) => {
        setLoading(true);
        try {
            const encodedDir = encodeURIComponent(dir);
            const response = await fetch(`http://localhost:5002/api/directories/read_directory?dir=${encodedDir}`);
            const result = await response.json();
            
            if (result.status) {
                setDirectoryContent(result.data);
            } else {
                console.error('Failed to read directory:', result.message);
            }
        } catch (error) {
            console.error('Error reading directory:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-body-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row">
                    {directoryContent.map((item, index) => (
                        <div key={index} className="col-12 col-sm-1 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <FileIcon fileType={item.type} fileName={item.name} />
                                    <p className="card-text">{item.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MainBody;
