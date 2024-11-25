import axios from 'axios';
import { refreshToken } from '../services/loginPost';

axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshTokenFromStorage = localStorage.getItem('refreshToken');

    if (accessToken) {
      const decodedToken = parseJwt(accessToken);
      const expiry = decodedToken.exp * 1000;
      const now = Date.now();

      if (expiry <= now) {
        try {
          const data = {
            accessToken: accessToken,
            refreshToken: refreshTokenFromStorage,
          };

          // Выполняем запрос на обновление токена
          const response = await refreshToken(data);
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response;

          if (newAccessToken) {
            // Сохраняем новые токены в локальное хранилище
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            // Обновляем заголовки
            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          } else {
            // Если новые токены не пришли — удаляем старые
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userName');
          }
        } catch (error) {
          console.error("Ошибка обновления токена:", error);
          // В случае ошибки удаляем токены
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userName');
          return Promise.reject(error);
        }
      } else {
        // Если токен не истёк, добавляем его в заголовок
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};