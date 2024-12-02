import axios from 'axios';

export const fetchActors = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/actors", {
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
        console.error("Error fetching actors:", error);
        return { data: [], metaData: null };
    }
};

export const fetchAllActors = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/actors/withoutmeta", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        
        return response.data;
    } catch (error) {
        console.error("Error fetching all actors:", error);
        return { data: [], metaData: null };
    }
};

export const getActorById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/actors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching actor:", error);
        throw new Error("Failed to fetch actor");
    }
};

export const deleteActor = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/actors/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching actor:", error);
        throw new Error("Failed to fetch actor");
    }
}

export const updateActor = async (id, actor) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/actors/${id}`, actor, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createActor = async (actor) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post('https://localhost:7254/api/actors', actor, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};