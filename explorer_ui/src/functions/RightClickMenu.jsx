// functions/RightClickMenu.jsx
import React from 'react';
import './rightClickMenu.css'; // Optional: Add your CSS for the right-click menu
import { FaCopy, FaCut, FaPaste, FaTrashAlt } from 'react-icons/fa'; // Import icons

function RightClickMenu({ x, y, visible, onCopy, onCut, onPaste, onDelete, onClose }) {
    return (
        visible ? (
            <div className="right-click-menu" style={{ top: y, left: x }}>
                <ul>
                    <li onClick={() => { onCopy(); onClose(); }}>
                        <FaCopy />
                        <span style={{ marginLeft: '8px' }}>Copy</span>
                    </li>
                    <li onClick={() => { onCut(); onClose(); }}>
                        <FaCut />
                        <span style={{ marginLeft: '8px' }}>Cut</span>
                    </li>
                    <li onClick={onPaste} style={{ opacity: onPaste ? 1 : 0.5, pointerEvents: onPaste ? 'auto' : 'none' }}>
                        <FaPaste />
                        <span style={{ marginLeft: '8px' }}>Paste</span>
                    </li>
                    <li onClick={() => { onDelete(); onClose(); }}>
                        <FaTrashAlt />
                        <span style={{ marginLeft: '8px' }}>Delete</span>
                    </li>
                </ul>
            </div>
        ) : null
    );
}


export default RightClickMenu;
