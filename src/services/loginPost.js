import axios from 'axios';

export const loginPost = async (params) => {
    try {
      const response = await axios.post("https://localhost:7254/api/authentication/login", params);
      const data = response.data;
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      console.error("Error login:", error);
      return { accessToken: null, refreshToken: null };
    }
  };

export const registerPost = async (params) => {
    const response = await axios.post("https://localhost:7254/api/authentication", params);
    return response;
};

export const editUser = async (model) => {
  const response = await axios.put("https://localhost:7254/user/edit",model);
  return response;
};

export const refreshToken = async (params) => {
  try {
    const response = await axios.post("https://localhost:7254/api/token/refresh", params);
    const data = response.data;

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return { accessToken: null, refreshToken: null };
  }
};
