// models/apiRequest.jsx
export const fetchDirectoryContent = async (dir, setLoading, setDirectoryContent) => {
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

export const fetchFolders = async (dir = '', setLoading, setFolders, setSubfolders) => {
    setLoading(true);
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

export const manageDirectory = async (sp_manage_directory, currentDir, setLoading, setDirectoryContent) => {
    setLoading(true);
    try {
        const response = await fetch('http://localhost:5002/api/directories/manage_directory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sp_manage_directory),
        });
        
        if (response.ok) {
            // Refresh the directory content after a successful operation
            await fetchDirectoryContent(currentDir, setLoading, setDirectoryContent);
        } else {
            console.error('Failed to manage directory:', response.statusText);
        }
    } catch (error) {
        console.error('Error managing directory:', error);
    } finally {
        setLoading(false);
    }
};