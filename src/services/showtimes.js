import axios from 'axios';

export const fetchShowtimes = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get("https://localhost:7254/api/showtimes", {
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
        console.error("Error fetching showtimes:", error);
        return { data: [], metaData: null };
    }
};

export const fetchAllShowtimes = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get("https://localhost:7254/api/showtimes/withoutmeta", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Error fetching all showtimes:", error);
        return { data: [], metaData: null };
    }
};

export const getShowtimeById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/showtimes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching showtime:", error);
        throw new Error("Failed to fetch showtime");
    }
};

export const deleteShowtime = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/showtimes/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching showtime:", error);
        throw new Error("Failed to fetch showtime");
    }
}

export const updateShowtime = async (id, showtime) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/showtimes/${id}`, showtime, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createShowtime = async (id, showtime) => {
    const token = localStorage.getItem('accessToken');
    console.log(showtime);
    const response = await axios.post(`https://localhost:7254/api/showtimes/${id}`, showtime, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};