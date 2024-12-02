import axios from 'axios';

export const fetchMovies = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get("https://localhost:7254/api/movies", {
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
        console.error("Error fetching movies:", error);
        return { data: [], metaData: null };
    }
};

export const fetchAllMovies = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get("https://localhost:7254/api/movies/withoutmeta", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all movies:", error);
        return { data: [], metaData: null };
    }
};

export const getMovieById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        throw new Error("Failed to fetch movie");
    }
};

export const deleteMovie = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/movies/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching movie:", error);
        throw new Error("Failed to fetch movie");
    }
}

export const updateMovie = async (id, movie) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/movies/${id}`, movie, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createMovie = async (id, movie) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`https://localhost:7254/api/movies/${id}`, movie, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};