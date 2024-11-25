import axios from 'axios';

export const fetchGenres = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/genres", {
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

export const getGenreById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/genres/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching genre:", error);
        throw new Error("Failed to fetch genre");
    }
};

export const deleteGenre = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/genres/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching genre:", error);
        throw new Error("Failed to fetch genre");
    }
}

export const updateGenre = async (id, genre) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/genres/${id}`, genre, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createGenre = async (genre) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post('https://localhost:7254/api/genres', genre, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};