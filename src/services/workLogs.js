import axios from 'axios';

export const fetchWorkLogs = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/workLogs", {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const metaDataHeader = response.headers['x-pagination'];
        const metaData = metaDataHeader ? JSON.parse(metaDataHeader) : null;
        
        return {
            data: response.data,
            metaData,
        };
    } catch (error) {
        console.error("Error fetching workLogs:", error);
        return { data: [], metaData: null };
    }
};

export const getWorkLogById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/workLogs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching workLog:", error);
        throw new Error("Failed to fetch workLog");
    }
};

export const deleteWorkLog = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/workLogs/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching workLog:", error);
        throw new Error("Failed to fetch workLog");
    }
}

export const updateWorkLog = async (id, workLog) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/workLogs/${id}`, workLog, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createWorkLog = async (id, workLog) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`https://localhost:7254/api/workLogs/${id}`, workLog, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};