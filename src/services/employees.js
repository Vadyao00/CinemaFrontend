import axios from 'axios';

export const fetchEmployees = async (params) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/employees", {
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
        console.error("Error fetching employees:", error);
        return { data: [], metaData: null };
    }
};

export const fetchAllEmployees = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get("https://localhost:7254/api/employees/withoutmeta", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Error fetching all employees:", error);
        return { data: [], metaData: null };
    }
};

export const getEmployeeById = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://localhost:7254/api/employees/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw new Error("Failed to fetch employee");
    }
};

export const deleteEmployee = async (id) => {
    try{
        const token = localStorage.getItem('accessToken');

        await axios.delete(`https://localhost:7254/api/employees/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }catch (error) {
        console.error("Error fetching employee:", error);
        throw new Error("Failed to fetch employee");
    }
}

export const updateEmployee = async (id, employee) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`https://localhost:7254/api/employees/${id}`, employee, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createEmployee = async (employee) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post('https://localhost:7254/api/employees', employee, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};