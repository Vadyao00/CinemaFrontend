import axios from 'axios';

export const fetchTickets = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/tickets", {
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
        console.error("Error fetching tickets:", error);
        return { data: [], metaData: null };
    }
};

export const getTicketById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/tickets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw new Error("Failed to fetch tickets");
    }
};

export const deleteTicket = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/tickets/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching ticket:", error);
        throw new Error("Failed to fetch ticket");
    }
}

export const updateTicket = async (id, ticket) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/tickets/${id}`, ticket, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createTicket = async (id, ticket) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`https://localhost:7254/api/tickets/${id}`, ticket, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};