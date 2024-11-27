import axios from 'axios';

export const fetchSeats = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/seats", {
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
        console.error("Error fetching seats:", error);
        return { data: [], metaData: null };
    }
};

export const getSeatById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/seats/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching seat:", error);
        throw new Error("Failed to fetch seat");
    }
};

export const deleteSeat = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/seats/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching seat:", error);
        throw new Error("Failed to fetch seat");
    }
}

export const updateSeat = async (id, seat) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/seats/${id}`, seat, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createSeat = async (id, seat) => {
    const token = localStorage.getItem('accessToken');
    console.log(showtime);
    const response = await axios.post(`https://localhost:7254/api/seats/${id}`, seat, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};