import axios from 'axios';
import { Profile } from '@/schemas/profile';
import { Orders } from '@/schemas/orders';

const API_URL = 'http://127.0.0.1:8000/api/users/me';

export const getProfile = async (access_token: string): Promise<Profile> => {
    const response = await axios.get<Profile>(API_URL, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
};

export const getOrdersProfile = async (access_token: string): Promise<Orders[]> => {
    const response = await axios.get<Orders[]>(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
};

export const updateProfile = async (access_token: string, data: Profile): Promise<Profile> => {
    const response = await axios.put<Profile>(`${API_URL}/`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
};

export const patchProfile = async (access_token: string, data: Partial<Profile>): Promise<Profile> => {
  const response = await axios.patch<Profile>("http://127.0.0.1:8000/api/users/", data, {
      headers: { Authorization: `Bearer ${access_token}` },
  });
  return response.data;
};