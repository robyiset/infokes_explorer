// components/MainBody.jsx
import React, { useState, useEffect } from 'react';
import './mainbody.css'; // Include your custom CSS
import FileIcon from '../models/FileIcon'; // Import the FileIcon component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { fetchDirectoryContent } from '../models/apiRequest'; // Import the fetchDirectoryContent function
import RightClickMenu from '../functions/RightClickMenu'; // Import the RightClickMenu component

function MainBody({ selectedDir }) {
    const [directoryContent, setDirectoryContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedItem, setSelectedItem] = useState(null);
    const [clipboard, setClipboard] = useState({ action: null, item: null });

    useEffect(() => {
        if (selectedDir !== undefined && selectedDir !== null) {
            fetchDirectoryContent(selectedDir, setLoading, setDirectoryContent);
        }
    }, [selectedDir]); // Depend on selectedDir

    const handleRightClick = (event, item) => {
        event.preventDefault(); // Prevent the default context menu
        setSelectedItem(item);
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setMenuVisible(true);
    };

    const handleDoubleClick = (item) => {
        // Check if the item is a folder
        if (item.type === 'FOLDER') {
            const newDir = `${selectedDir}\\${item.name}`; // Construct the new directory path
            fetchDirectoryContent(newDir, setLoading, setDirectoryContent); // Fetch content for the new directory
        }
    };

    const handleCopy = () => {
        setClipboard({ action: 'copy', item: selectedItem });
    };

    const handleCut = () => {
        setClipboard({ action: 'cut', item: selectedItem });
        setDirectoryContent(prev => 
            prev.map(item => 
                item.name === selectedItem.name ? { ...item, cut: true } : item
            )
        );
    };

    const handlePaste = () => {
        if (clipboard.action === 'copy' || clipboard.action === 'cut') {
            const newItem = { ...clipboard.item, cut: clipboard.action === 'cut' };
            setDirectoryContent(prev => [...prev, newItem]);
            setClipboard({ action: null, item: null }); // Clear clipboard after pasting
        }
    };

    const handleDelete = () => {
        setDirectoryContent(prev => 
            prev.filter(item => item.name !== selectedItem.name)
        );
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
        setSelectedItem(null);
    };

    return (
        <div className="main-body-container" onClick={handleCloseMenu}>
            {loading ? (
                <p>Loading...</p>
            ) : directoryContent.length === 0 ? ( // Check if the directory is empty
                <p>This folder is empty.</p>
            ) : (
                <div className="row">
                    {directoryContent.map((item, index) => (
                        <div 
                            key={index} 
                            className="col-12 col-sm-1 mb-3" 
                            onContextMenu={(event) => handleRightClick(event, item)} 
                            onDoubleClick={() => handleDoubleClick(item)} 
                        >
                            <div className={`card text-center ${item.cut ? 'opacity-75' : ''}`}>
                                <div className="card-body">
                                    <FileIcon fileType={item.type} fileName={item.name} />
                                    <p className="card-text">{item.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <RightClickMenu 
                x={menuPosition.x} 
                y={menuPosition.y} 
                visible={menuVisible} 
                onCopy={handleCopy} 
                onCut={handleCut} 
                onPaste={handlePaste} 
                onDelete={handleDelete} 
                onClose={handleCloseMenu} 
            />
        </div>
    );
}

export default MainBody;
