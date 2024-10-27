import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const refreshAuthToken = async (): Promise<string | null> => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/refresh', {}, {
        withCredentials: true, 
      });
      const { token } = response.data; 
      localStorage.setItem('token', token.access_token); 
      return token;
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error);
      return null;
    }
  };

const apiAxios = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
      config.url = 'http://localhost:8000/api' + config.url;
    }
  
    try {
      return await axios(config);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {

        const newToken = await refreshAuthToken();
        if (newToken) {
          config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${newToken}`,
          };
          return await axios(config);
        }
      }
      console.error('Ошибка при выполнении API запроса:', error);
      throw error;
    }
  };

export default apiAxios