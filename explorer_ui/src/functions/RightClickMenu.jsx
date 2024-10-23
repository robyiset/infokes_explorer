// functions/RightClickMenu.jsx
import React from 'react';
import './rightClickMenu.css'; // Optional: Add your CSS for the right-click menu
import { FaCopy, FaCut, FaPaste, FaTrashAlt, FaSpinner } from 'react-icons/fa'; // Import icons

function RightClickMenu({ x, y, visible, onCopy, onCut, onPaste, onDelete, onClose, onRefresh, onManage, showPasteOption }) {
    return (
        visible ? (
            <div className="right-click-menu" style={{ top: y, left: x }}>
                <ul>
                    <li onClick={() => { onRefresh(); onClose(); }}>
                        <FaSpinner />
                        <span style={{ marginLeft: '8px' }}>Refresh</span>
                    </li>
                    {showPasteOption == true ? (
                        <>
                            
                            <li onClick={() => { onPaste(); onClose(); }}>
                                <FaPaste />
                                <span style={{ marginLeft: '8px' }}>Paste</span>
                            </li>
                        </>
                        
                    ) : (
                        <>
                            
                        </>
                    )}
                    {onManage == true ? (
                        <>
                            <li onClick={() => { onCopy(); onClose(); }}>
                                <FaCopy />
                                <span style={{ marginLeft: '8px' }}>Copy</span>
                            </li>
                            <li onClick={() => { onCut(); onClose(); }}>
                                <FaCut />
                                <span style={{ marginLeft: '8px' }}>Cut</span>
                            </li>
                            <li onClick={() => { onDelete(); onClose(); }}>
                                <FaTrashAlt />
                                <span style={{ marginLeft: '8px' }}>Delete</span>
                            </li>
                        </>
                    ):(
                        <></>
                    )}
                </ul>
            </div>
        ) : null
    );
}

export default RightClickMenu;
