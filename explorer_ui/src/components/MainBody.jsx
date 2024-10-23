// components/MainBody.jsx
import React, { useState, useEffect } from 'react';
import './mainbody.css';
import FileIcon from '../models/FileIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchDirectoryContent, manageDirectory } from '../models/apiRequest';
import RightClickMenu from '../functions/RightClickMenu';
import SpManageDirectory from '../models/sp_manage_directory';
import Navbar from './Navbar'; // Import the Navbar component
import Swal from 'sweetalert2'; // Import SweetAlert

function MainBody({ selectedDir }) {
    const [directoryContent, setDirectoryContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menupaste, setMenuPaste] = useState(false);
    const [menumanage, setMenuManage] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedItem, setSelectedItem] = useState(null);
    const [clipboard, setClipboard] = useState({ action: null, item: null });
    const [currentDir, setCurrentDir] = useState(selectedDir);
    const [history, setHistory] = useState([]); // For back and forward navigation
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [sp_manage_directory, setManageDirectory] = useState(null); // Initialize as null

    useEffect(() => {
        if (selectedDir !== undefined && selectedDir !== null) {
            setCurrentDir(selectedDir); // Set current directory when selectedDir changes
            fetchDirectoryContent(selectedDir, setLoading, setDirectoryContent);
        }
    }, [selectedDir]);

    const handleRightClickOnCard = (event, item) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent the event from bubbling up to the row
        setSelectedItem(item);
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setMenuManage(true);
        setMenuVisible(true);
    };

    const handleRightClickOnEmptySpace = (event) => {
        event.preventDefault();
        setSelectedItem(null); // No item selected
        setMenuPosition({ x: event.clientX, y: event.clientY });
        setMenuManage(false);
        setMenuVisible(true);
    };

    const handleRefresh = () => {
        fetchDirectoryContent(currentDir, setLoading, setDirectoryContent);
    };

    const handleDoubleClick = (item) => {
        if (item.type === 'FOLDER') {
            const newDir = `${currentDir}\\${item.name}`;
            updateHistory(currentDir); // Update history for back navigation
            fetchDirectoryContent(newDir, setLoading, setDirectoryContent);
            setCurrentDir(newDir); // Update the current directory
        }
    };

    const updateHistory = (newDir) => {
        const updatedHistory = [...history.slice(0, historyIndex + 1), newDir];
        setHistory(updatedHistory);
        setHistoryIndex(updatedHistory.length - 1);
    };

    const handleBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            const previousDir = history[historyIndex - 1];
            setCurrentDir(previousDir);
            fetchDirectoryContent(previousDir, setLoading, setDirectoryContent);
        }
    };

    const handleForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            const nextDir = history[historyIndex + 1];
            setCurrentDir(nextDir);
            fetchDirectoryContent(nextDir, setLoading, setDirectoryContent);
        }
    };

    const handleChangeDir = (newDir) => {
        if (newDir) {
            updateHistory(currentDir); // Update history before changing directory
            setCurrentDir(newDir);
            fetchDirectoryContent(newDir, setLoading, setDirectoryContent);
        }
    };

    const handleCopy = () => {
        if (selectedItem) {
            setManageDirectory(new SpManageDirectory(
                selectedItem.directory,
                selectedItem.name,
                selectedItem.type,
                'COPY',
                currentDir
            ));
            setMenuPaste(true);
        }
    };

    const handleCut = () => {
        if (selectedItem) {
            setManageDirectory(new SpManageDirectory(
                selectedItem.directory,
                selectedItem.name,
                selectedItem.type,
                'CUT',
                currentDir
            ));
            setMenuPaste(true);
        }
    };

    const handlePaste = async () => {
        setMenuPaste(false);
        if (sp_manage_directory && (sp_manage_directory.action === 'COPY' || sp_manage_directory.action === 'CUT')) {
            const updatedManageDirectory = new SpManageDirectory(
                sp_manage_directory.mdir,   
                sp_manage_directory.mname,  
                sp_manage_directory.mtype,   
                sp_manage_directory.action,  
                currentDir                  
            );
            await processDirectoryManagement(updatedManageDirectory, currentDir, setLoading, setDirectoryContent);
        }
    };

    const handleDelete = async () => {
        if (selectedItem) {

            await processDirectoryManagement(new SpManageDirectory(
                selectedItem.directory,
                selectedItem.name,
                selectedItem.type,
                'DELETE',
                currentDir
            ), currentDir, setLoading, setDirectoryContent);
        }
    };

    const processDirectoryManagement = async (sp_manage_directory, currentDir, setLoading, setDirectoryContent) => {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we manage the directory.',
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
        });

        // Call manageDirectory and wait for the response
        const response = await manageDirectory(sp_manage_directory, currentDir, setLoading, setDirectoryContent);

        // Close loading alert
        Swal.close();

        // Show status message
        Swal.fire({
            title: response.status ? 'Success' : 'Error',
            text: response.message,
            icon: response.status ? 'success' : 'error',
        });
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
        setSelectedItem(null);
    };

    return (
        <div className="main-body-container" onClick={handleCloseMenu} onContextMenu={(event) => event.preventDefault()}>
            <Navbar 
                currentDir={currentDir} 
                onBack={handleBack} 
                onForward={handleForward} 
                onChangeDir={handleChangeDir} 
            />
            {loading ? (
                <div className="row">
                    <p>Loading...</p>
                </div>
            ) : directoryContent.length === 0 ? (
                <div className="row" onContextMenu={(event) => handleRightClickOnEmptySpace(event)}>
                    <p>This folder is empty.</p>
                </div>
            ) : (
                <div className="row" onContextMenu={(event) => handleRightClickOnEmptySpace(event)}>
                    {directoryContent.map((item, index) => (
                        <div 
                            key={index} 
                            className="col-12 col-sm-1 mb-3">
                            <div 
                                className={`card text-center ${sp_manage_directory && sp_manage_directory.action === 'CUT' 
                                && item.name === sp_manage_directory.mname && item.directory === sp_manage_directory.mdir ? 'opacity-75' : ''}`} 
                                onContextMenu={(event) => handleRightClickOnCard(event, item)} 
                                onDoubleClick={() => handleDoubleClick(item)}>
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
                onRefresh={handleRefresh} 
                onManage={menumanage}
                showPasteOption={menupaste} // Show paste option only when no item is selected
            />
        </div>
    );
}

export default MainBody;
