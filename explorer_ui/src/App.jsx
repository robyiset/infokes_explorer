// App.jsx
import React, { useState } from 'react';
import Sidebar from "./components/Sidebar";
import MainBody from "./components/MainBody";

function App() {
    const [selectedDir, setSelectedDir] = useState(''); // Track selected directory

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="sidebar">
                <Sidebar setSelectedDir={setSelectedDir} />
            </div>
            {/* Main Body */}
            <div className="main-body flex-grow-1">
                <MainBody selectedDir={selectedDir} />
            </div>
        </div>
    );
}

export default App;
