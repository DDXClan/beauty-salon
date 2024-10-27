import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/'; 

export interface LoginResponse {
  access_token: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {

  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await axios.post<LoginResponse>(`${API_URL}login`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }

  return response.data;
};

export const signUp = async (username: string, password: string, phone_number: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('http://127.0.0.1:8000/api/auth/signup', {
      username,
      password,
      phone_number,
  }, {
      headers: {
          'Content-Type': 'application/json',
      },
  });

  return response.data; 
};
