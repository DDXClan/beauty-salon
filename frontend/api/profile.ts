// api/profile.ts
import axios from 'axios';
import { Profile } from '@/schemas/profile';
import { Orders } from '@/schemas/orders';

export const API_URL = 'http://127.0.0.1:8000/api/users/me';

export const getProfile = async (access_token: string): Promise<Profile> => {
  const response = await axios.get<Profile>(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${access_token}`, 
    },
  });
  return response.data;
};

export const getOrdersProfile = async () => {
  const access_token = localStorage.getItem('access_token'); 
  const response = await axios.get<Orders[]>(`${API_URL}/orders`, {
  headers: {
    Authorization: `Bearer ${access_token}`, 
  },
});
return response.data;
};