// models/FileIcon.jsx
import React from 'react';
import { 
    FaFolder, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFilePdf, 
    FaFileArchive, FaFileImage, FaFileVideo, FaFileAudio, 
    FaFileCsv, FaFileCode, FaFileAlt, FaFile 
} from 'react-icons/fa';

const colorMap = {
    FOLDER: 'gold', // Color for folders
    WORD: 'blue', // Color for Word files
    EXCEL: 'green', // Color for Excel files
    POWERPOINT: 'orange', // Color for PowerPoint files
    PDF: 'red', // Color for PDF files
    ARCHIVE: 'purple', // Color for Archive files
    IMAGE: 'pink', // Color for Image files
    VIDEO: 'cyan', // Color for Video files
    AUDIO: 'brown', // Color for Audio files
    TEXT: 'gray', // Color for Text files
    CSV: 'lightblue', // Color for CSV files
    CODE: 'teal', // Color for Code files
    DEFAULT: 'black' // Default color for unknown file types
};

const FileIcon = ({ fileType, fileName }) => {
    const getColor = () => {
        if (fileType === 'FOLDER') return colorMap.FOLDER;
        
        const fileExtension = fileName.split('.').pop().toLowerCase();

        switch (fileExtension) {
            case 'doc':
            case 'docx':
                return colorMap.WORD;
            case 'xls':
            case 'xlsx':
                return colorMap.EXCEL;
            case 'ppt':
            case 'pptx':
                return colorMap.POWERPOINT;
            case 'pdf':
                return colorMap.PDF;
            case 'zip':
            case 'rar':
            case '7z':
            case 'tar':
            case 'gz':
                return colorMap.ARCHIVE; // Use FaFileArchive for compressed files
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'svg':
                return colorMap.IMAGE;
            case 'mp4':
            case 'avi':
            case 'mov':
            case 'wmv':
                return colorMap.VIDEO;
            case 'mp3':
            case 'wav':
            case 'flac':
            case 'ogg':
                return colorMap.AUDIO;
            case 'txt':
                return colorMap.TEXT; // Use FaFileAlt for text files
            case 'csv':
                return colorMap.CSV;
            case 'js':
            case 'py':
            case 'html':
            case 'css':
            case 'java':
            case 'c':
            case 'cpp':
            case 'cs':
                return colorMap.CODE;
            default:
                return colorMap.DEFAULT;
        }
    };

    const iconColor = getColor();

    return (
        <span style={{ color: iconColor }}>
            {fileType === 'FOLDER' ? <FaFolder /> : 
            fileName.split('.').pop().toLowerCase() === 'doc' || fileName.split('.').pop().toLowerCase() === 'docx' ? <FaFileWord /> :
            fileName.split('.').pop().toLowerCase() === 'xls' || fileName.split('.').pop().toLowerCase() === 'xlsx' ? <FaFileExcel /> :
            fileName.split('.').pop().toLowerCase() === 'ppt' || fileName.split('.').pop().toLowerCase() === 'pptx' ? <FaFilePowerpoint /> :
            fileName.split('.').pop().toLowerCase() === 'pdf' ? <FaFilePdf /> :
            fileName.split('.').pop().toLowerCase() === 'zip' || fileName.split('.').pop().toLowerCase() === 'rar' || fileName.split('.').pop().toLowerCase() === '7z' || fileName.split('.').pop().toLowerCase() === 'tar' || fileName.split('.').pop().toLowerCase() === 'gz' ? <FaFileArchive /> :
            fileName.split('.').pop().toLowerCase() === 'jpg' || fileName.split('.').pop().toLowerCase() === 'jpeg' || fileName.split('.').pop().toLowerCase() === 'png' || fileName.split('.').pop().toLowerCase() === 'gif' || fileName.split('.').pop().toLowerCase() === 'bmp' || fileName.split('.').pop().toLowerCase() === 'svg' ? <FaFileImage /> :
            fileName.split('.').pop().toLowerCase() === 'mp4' || fileName.split('.').pop().toLowerCase() === 'avi' || fileName.split('.').pop().toLowerCase() === 'mov' || fileName.split('.').pop().toLowerCase() === 'wmv' ? <FaFileVideo /> :
            fileName.split('.').pop().toLowerCase() === 'mp3' || fileName.split('.').pop().toLowerCase() === 'wav' || fileName.split('.').pop().toLowerCase() === 'flac' || fileName.split('.').pop().toLowerCase() === 'ogg' ? <FaFileAudio /> :
            fileName.split('.').pop().toLowerCase() === 'txt' ? <FaFileAlt /> :
            fileName.split('.').pop().toLowerCase() === 'csv' ? <FaFileCsv /> :
            fileName.split('.').pop().toLowerCase() === 'js' || fileName.split('.').pop().toLowerCase() === 'py' || fileName.split('.').pop().toLowerCase() === 'html' || fileName.split('.').pop().toLowerCase() === 'css' || fileName.split('.').pop().toLowerCase() === 'java' || fileName.split('.').pop().toLowerCase() === 'c' || fileName.split('.').pop().toLowerCase() === 'cpp' || fileName.split('.').pop().toLowerCase() === 'cs' ? <FaFileCode /> :
            <FaFile />}
        </span>
    );
};

export default FileIcon;
