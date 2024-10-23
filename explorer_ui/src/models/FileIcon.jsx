// models/FileIcon.jsx
import React from 'react';
import { 
    FaFolder, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFilePdf, 
    FaFileArchive, FaFileImage, FaFileVideo, FaFileAudio, 
    FaFileCsv, FaFileCode, FaFileAlt, FaFile 
} from 'react-icons/fa';

const FileIcon = ({ fileType, fileName }) => {
    if (fileType === 'FOLDER') {
        return <FaFolder />;
    } else if (fileType === 'FILE') {
        const fileExtension = fileName.split('.').pop().toLowerCase();

        switch (fileExtension) {
            case 'doc':
            case 'docx':
                return <FaFileWord />;
            case 'xls':
            case 'xlsx':
                return <FaFileExcel />;
            case 'ppt':
            case 'pptx':
                return <FaFilePowerpoint />;
            case 'pdf':
                return <FaFilePdf />;
            case 'zip':
            case 'rar':
            case '7z':
            case 'tar':
            case 'gz':
                return <FaFileArchive />; // Use FaFileArchive for compressed files
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'svg':
                return <FaFileImage />;
            case 'mp4':
            case 'avi':
            case 'mov':
            case 'wmv':
                return <FaFileVideo />;
            case 'mp3':
            case 'wav':
            case 'flac':
            case 'ogg':
                return <FaFileAudio />;
            case 'txt':
                return <FaFileAlt />; // Use FaFileAlt for text files
            case 'csv':
                return <FaFileCsv />;
            case 'js':
            case 'py':
            case 'html':
            case 'css':
            case 'java':
            case 'c':
            case 'cpp':
            case 'cs':
                return <FaFileCode />;
            default:
                return <FaFile />;
        }
    }
    return <FaFile />;
};

export default FileIcon;
