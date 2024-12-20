import axios from 'axios';

export const fetchEvents = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/events", {
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
        console.error("Error fetching events:", error);
        return { data: [], metaData: null };
    }
};

export const fetchAllEvents = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/events/withoutmeta", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Error fetching all events:", error);
        return { data: [], metaData: null };
    }
};

export const getEventById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching event:", error);
        throw new Error("Failed to fetch event");
    }
};

export const deleteEvent = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/events/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching event:", error);
        throw new Error("Failed to fetch event");
    }
}

export const updateEvent = async (id, event) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/events/${id}`, event, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createEvent = async (event) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post('https://localhost:7254/api/events', event, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};